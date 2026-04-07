<?php

declare(strict_types=1);

/**
 * Unified JSON response helper.
 * Every method outputs a JSON body and terminates execution.
 */
class Response
{
    /**
     * Send a successful JSON response.
     *
     * @param mixed $data       The payload to include under the "data" key.
     * @param int   $statusCode HTTP status code (default 200).
     */
    public static function json(mixed $data, int $statusCode = 200): never
    {
        http_response_code($statusCode);
        echo json_encode(
            ['success' => true, 'data' => $data],
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        exit;
    }

    /**
     * Send an error JSON response.
     *
     * @param string $message    Human-readable error description.
     * @param int    $statusCode HTTP status code (default 400).
     * @param array  $errors     Optional map of field-level validation errors.
     */
    public static function error(string $message, int $statusCode = 400, array $errors = []): never
    {
        http_response_code($statusCode);
        echo json_encode(
            ['success' => false, 'message' => $message, 'errors' => $errors],
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        exit;
    }
}
