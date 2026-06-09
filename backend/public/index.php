<?php

declare(strict_types=1);

// ---------------------------------------------------------------------------
// 1. Bootstrap — loads .env, sets CORS, Content-Type, handles OPTIONS
// ---------------------------------------------------------------------------

require_once __DIR__ . '/../config/app.php';

// ---------------------------------------------------------------------------
// 2. Core helpers always needed
// ---------------------------------------------------------------------------

require_once __DIR__ . '/../helpers/Response.php';
require_once __DIR__ . '/../helpers/Validator.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

// ---------------------------------------------------------------------------
// 3. Database factory
// ---------------------------------------------------------------------------

require_once __DIR__ . '/../config/database.php';

// ---------------------------------------------------------------------------
// 4. Load route table
// ---------------------------------------------------------------------------

$routes = require __DIR__ . '/../routes/api.php';

// ---------------------------------------------------------------------------
// 4b. Global exception / error handler — returns JSON 500 instead of HTML
// ---------------------------------------------------------------------------

set_exception_handler(function (Throwable $e) {
    http_response_code(500);
    $msg = (defined('APP_ENV') && APP_ENV === 'development')
        ? get_class($e) . ': ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine()
        : 'An internal server error occurred.';
    echo json_encode(['success' => false, 'message' => $msg, 'errors' => []]);
    exit;
});

// ---------------------------------------------------------------------------
// 5. Resolve current request
// ---------------------------------------------------------------------------

$method     = strtoupper($_SERVER['REQUEST_METHOD']);
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';

// Strip query string
$path = parse_url($requestUri, PHP_URL_PATH);
$path = '/' . trim($path, '/');

// ---------------------------------------------------------------------------
// 6. Route matching
// ---------------------------------------------------------------------------

/**
 * Convert a route pattern like /api/admin/leads/{id}/status into a regex.
 * Captures the numeric {id} segment into named group "id".
 *
 * Strategy: replace the {id} placeholder BEFORE calling preg_quote, using a
 * unique sentinel that contains no regex-special characters, then substitute
 * the real capture group back after escaping.
 */
function routeToRegex(string $pattern): string
{
    $idSentinel   = 'IDPLACEHOLDER999';
    $slugSentinel = 'SLUGPLACEHOLDER999';

    $withSentinel = str_replace('{id}',   $idSentinel,   $pattern);
    $withSentinel = str_replace('{slug}', $slugSentinel, $withSentinel);

    $escaped = preg_quote($withSentinel, '#');

    $regex = str_replace($idSentinel,   '(?P<id>[0-9]+)',          $escaped);
    $regex = str_replace($slugSentinel, '(?P<slug>[a-z0-9\-]+)', $regex);

    return '#^' . $regex . '$#';
}

$matched      = false;
$routeParams  = [];
$adminPayload = null; // decoded JWT payload for authenticated routes

foreach ($routes as $route) {
    [$routeMethod, $routePattern, $controllerClass, $controllerMethod] = $route;
    $requiresAuth = $route[4] ?? false;

    // HTTP method must match
    if ($routeMethod !== $method) {
        continue;
    }

    // Build regex and test path
    $regex = routeToRegex($routePattern);
    if (!preg_match($regex, $path, $matches)) {
        continue;
    }

    $matched = true;

    // Extract path parameters if present
    if (isset($matches['id'])) {
        $routeParams['id'] = (int) $matches['id'];
    }
    if (isset($matches['slug'])) {
        $routeParams['slug'] = $matches['slug'];
    }

    // ---------------------------------------------------------------------------
    // 7. Auth check
    // ---------------------------------------------------------------------------

    if ($requiresAuth) {
        $authMiddleware = new AuthMiddleware();
        $adminPayload   = $authMiddleware->authenticate(); // exits with 401 on failure
    }

    // ---------------------------------------------------------------------------
    // 8. Lazy-load controller and dispatch
    // ---------------------------------------------------------------------------

    $controllerFile = __DIR__ . '/../controllers/' . $controllerClass . '.php';
    if (!file_exists($controllerFile)) {
        Response::error('Controller not found: ' . $controllerFile, 500);
    }

    require_once $controllerFile;

    if (!class_exists($controllerClass)) {
        Response::error('Controller not found: ' . $controllerFile, 500);
    }

    $db         = Database::getConnection();
    $controller = new $controllerClass($db);

    if (!method_exists($controller, $controllerMethod)) {
        Response::error('Controller not found: ' . $controllerFile, 500);
    }

    // Call the method — pass path parameter as first argument when present
    if (isset($routeParams['id'])) {
        $controller->{$controllerMethod}($routeParams['id']);
    } elseif (isset($routeParams['slug'])) {
        $controller->{$controllerMethod}($routeParams['slug']);
    } else {
        $controller->{$controllerMethod}();
    }

    // Response::json / Response::error call exit(), so we never reach here.
    // This break is a safety net for any future methods that don't exit.
    break;
}

// ---------------------------------------------------------------------------
// 9. No matching route
// ---------------------------------------------------------------------------

if (!$matched) {
    Response::error(
        "Cannot {$method} {$path}",
        404
    );
}
