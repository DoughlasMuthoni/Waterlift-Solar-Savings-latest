<?php

declare(strict_types=1);

/**
 * JWT Authentication Middleware.
 *
 * Implements manual HS256 JWT verification — no external libraries required.
 * Token format: base64url(header).base64url(payload).base64url(signature)
 */
class AuthMiddleware
{
    // ------------------------------------------------------------------
    // Public API
    // ------------------------------------------------------------------

    /**
     * Validate the Bearer token present in the Authorization header.
     * Returns the decoded payload array on success.
     * Calls Response::error(401) and exits on any failure.
     *
     * @return array<string, mixed> Decoded JWT payload.
     */
    public function authenticate(): array
    {
        $token = $this->extractToken();

        if ($token === null) {
            Response::error('Authorization token is required.', 401);
        }

        $payload = $this->verifyToken($token);

        if ($payload === null) {
            Response::error('Invalid or expired token.', 401);
        }

        return $payload;
    }

    // ------------------------------------------------------------------
    // Static JWT helpers — also used by AuthController
    // ------------------------------------------------------------------

    /**
     * Generate a signed HS256 JWT.
     *
     * @param  array<string, mixed> $payload Claims to embed (exp should be included).
     * @return string Signed JWT string.
     */
    public static function generateToken(array $payload): string
    {
        $header = self::base64urlEncode(json_encode([
            'alg' => 'HS256',
            'typ' => 'JWT',
        ]));

        $body = self::base64urlEncode(json_encode($payload));

        $signature = self::base64urlEncode(
            hash_hmac('sha256', "{$header}.{$body}", JWT_SECRET, true)
        );

        return "{$header}.{$body}.{$signature}";
    }

    // ------------------------------------------------------------------
    // Private helpers
    // ------------------------------------------------------------------

    /**
     * Extract the Bearer token from the Authorization header.
     */
    private function extractToken(): ?string
    {
        // Prefer apache_request_headers() when available
        $authHeader = null;

        if (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
            // Header names are case-insensitive
            foreach ($headers as $name => $value) {
                if (strtolower($name) === 'authorization') {
                    $authHeader = $value;
                    break;
                }
            }
        }

        // Fall back to $_SERVER
        if ($authHeader === null) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION']
                ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
                ?? null;
        }

        if ($authHeader === null) {
            return null;
        }

        if (preg_match('/^Bearer\s+(.+)$/i', trim($authHeader), $matches)) {
            return $matches[1];
        }

        return null;
    }

    /**
     * Verify a JWT and return its payload, or null on failure.
     *
     * @return array<string, mixed>|null
     */
    private function verifyToken(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$headerB64, $payloadB64, $signatureB64] = $parts;

        // Recompute expected signature
        $expectedSig = self::base64urlEncode(
            hash_hmac('sha256', "{$headerB64}.{$payloadB64}", JWT_SECRET, true)
        );

        // Constant-time comparison to prevent timing attacks
        if (!hash_equals($expectedSig, $signatureB64)) {
            return null;
        }

        // Decode payload
        $payloadJson = self::base64urlDecode($payloadB64);
        if ($payloadJson === false) {
            return null;
        }

        $payload = json_decode($payloadJson, true);
        if (!is_array($payload)) {
            return null;
        }

        // Validate expiry
        if (isset($payload['exp']) && time() > (int) $payload['exp']) {
            return null;
        }

        return $payload;
    }

    // ------------------------------------------------------------------
    // Base64url encode / decode (RFC 4648 §5)
    // ------------------------------------------------------------------

    public static function base64urlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64urlDecode(string $data): string|false
    {
        // Restore standard base64 padding
        $padded = strtr($data, '-_', '+/');
        $mod    = strlen($padded) % 4;
        if ($mod !== 0) {
            $padded .= str_repeat('=', 4 - $mod);
        }
        return base64_decode($padded, true);
    }
}
