<?php

declare(strict_types=1);

/**
 * AuthController — handles admin login and logout.
 */
class AuthController
{
    private Admin $adminModel;

    public function __construct(PDO $db)
    {
        require_once __DIR__ . '/../models/Admin.php';
        $this->adminModel = new Admin($db);
    }

    // ------------------------------------------------------------------
    // POST /api/auth/login
    // ------------------------------------------------------------------

    /**
     * Authenticate an admin and return a signed JWT.
     *
     * Request body (JSON):
     *   { "username": "...", "password": "..." }
     *
     * Response:
     *   { "success": true, "data": { "token": "...", "admin": { ... } } }
     */
    public function login(): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        // Validate required fields
        require_once __DIR__ . '/../helpers/Validator.php';
        $missing = Validator::required($body, ['username', 'password']);
        if ($missing) {
            Response::error(
                'Missing required fields.',
                422,
                array_fill_keys($missing, 'This field is required.')
            );
        }

        $username = htmlspecialchars(strip_tags(trim((string) $body['username'])));
        $password = (string) $body['password']; // Do NOT sanitize the password

        // Look up admin
        $admin = $this->adminModel->findByUsername($username);
        if ($admin === null) {
            Response::error('Invalid username or password.', 401);
        }

        // Verify password
        if (!$this->adminModel->verifyPassword($password, $admin['password_hash'])) {
            Response::error('Invalid username or password.', 401);
        }

        // Build JWT payload (24-hour expiry)
        $payload = [
            'sub'      => $admin['id'],
            'username' => $admin['username'],
            'iat'      => time(),
            'exp'      => time() + 86400, // 24 hours
        ];

        require_once __DIR__ . '/../middleware/AuthMiddleware.php';
        $token = AuthMiddleware::generateToken($payload);

        Response::json([
            'token' => $token,
            'admin' => [
                'id'        => (int) $admin['id'],
                'username'  => $admin['username'],
                'email'     => $admin['email'],
                'full_name' => $admin['full_name'],
            ],
        ]);
    }

    // ------------------------------------------------------------------
    // POST /api/auth/logout
    // ------------------------------------------------------------------

    /**
     * Stateless logout — instruct the client to discard the token.
     */
    public function logout(): void
    {
        Response::json(['message' => 'Logged out successfully.']);
    }
}
