<?php

declare(strict_types=1);

/**
 * Admin model — handles authentication-related DB queries.
 */
class Admin
{
    public function __construct(private PDO $db) {}

    /**
     * Find an admin record by username.
     *
     * @param  string $username
     * @return array<string, mixed>|null  Row as assoc array, or null if not found.
     */
    public function findByUsername(string $username): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT id, username, email, password_hash, full_name, created_at
               FROM admins
              WHERE username = :username
              LIMIT 1'
        );
        $stmt->execute([':username' => $username]);
        $row = $stmt->fetch();
        return $row !== false ? $row : null;
    }

    /**
     * Verify a plain-text password against a bcrypt hash.
     *
     * @param  string $plain Plain-text password supplied by the user.
     * @param  string $hash  Stored bcrypt hash.
     * @return bool
     */
    public function verifyPassword(string $plain, string $hash): bool
    {
        return password_verify($plain, $hash);
    }
}
