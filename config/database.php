<?php

declare(strict_types=1);

/**
 * Database PDO factory.
 * Provides a singleton PDO connection configured via environment variables.
 */
class Database
{
    private static ?PDO $connection = null;

    /**
     * Returns the singleton PDO instance.
     *
     * @throws RuntimeException if connection fails
     */
    public static function getConnection(): PDO
    {
        if (self::$connection !== null) {
            return self::$connection;
        }

        $host    = env('DB_HOST', 'localhost');
        $port    = env('DB_PORT', '3306');
        $dbName  = env('DB_NAME', 'waterlift_solar');
        $user    = env('DB_USER', 'root');
        $pass    = env('DB_PASS', 'mwalatvc');

        $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset=utf8mb4";

        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            self::$connection = new PDO($dsn, $user, $pass, $options);
        } catch (PDOException $e) {
            // In production hide the raw message; in development expose it
            $msg = (APP_ENV === 'development')
                ? 'Database connection failed: ' . $e->getMessage()
                : 'Database connection failed. Please try again later.';
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $msg, 'errors' => []]);
            exit;
        }

        return self::$connection;
    }
}
