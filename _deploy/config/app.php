<?php

declare(strict_types=1);

/**
 * Application bootstrap: loads .env, defines constants, sets CORS and Content-Type headers.
 */

// ---------------------------------------------------------------------------
// 1. Load .env file
// ---------------------------------------------------------------------------

$envFile = dirname(__DIR__) . '/.env';

if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        // Skip comments and empty lines
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }
        if (str_contains($line, '=')) {
            [$key, $value] = explode('=', $line, 2);
            $key   = trim($key);
            $value = trim($value);
            // Strip surrounding quotes if present
            if (
                (str_starts_with($value, '"') && str_ends_with($value, '"')) ||
                (str_starts_with($value, "'") && str_ends_with($value, "'"))
            ) {
                $value = substr($value, 1, -1);
            }
            if (!array_key_exists($key, $_ENV)) {
                $_ENV[$key]    = $value;
                $_SERVER[$key] = $value;
                putenv("{$key}={$value}");
            }
        }
    }
}

// ---------------------------------------------------------------------------
// 2. Helper: read env with default
// ---------------------------------------------------------------------------

function env(string $key, mixed $default = null): mixed
{
    $value = $_ENV[$key] ?? getenv($key);
    if ($value === false || $value === null) {
        return $default;
    }
    return $value;
}

// ---------------------------------------------------------------------------
// 3. Define application constants
// ---------------------------------------------------------------------------

define('APP_ENV',     env('APP_ENV',     'production'));
define('APP_URL',     env('APP_URL',     'http://localhost:8000'));
define('JWT_SECRET',  env('JWT_SECRET',  'fallback_secret_change_me'));
define('CORS_ORIGIN', env('CORS_ORIGIN', '*'));

// ---------------------------------------------------------------------------
// 4. CORS headers
// ---------------------------------------------------------------------------

$allowedOrigin = CORS_ORIGIN;

// Allow any origin if wildcard is set, otherwise restrict to configured origin
if ($allowedOrigin === '*') {
    header('Access-Control-Allow-Origin: *');
} else {
    $requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($requestOrigin === $allowedOrigin) {
        header("Access-Control-Allow-Origin: {$allowedOrigin}");
    } else {
        header("Access-Control-Allow-Origin: {$allowedOrigin}");
    }
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');

// ---------------------------------------------------------------------------
// 5. Handle preflight OPTIONS request
// ---------------------------------------------------------------------------

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ---------------------------------------------------------------------------
// 6. Force JSON response content-type
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');

// ---------------------------------------------------------------------------
// 7. Error reporting based on environment
// ---------------------------------------------------------------------------

if (APP_ENV === 'development') {
    ini_set('display_errors', '1');
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', '0');
    error_reporting(0);
}
