<?php
/**
 * CLI-only script to create or reset the admin account.
 * Fully self-contained — no dependency on app.php or database.php.
 *
 * Usage:
 *   php backend/setup_admin.php
 */

declare(strict_types=1);

// ---------------------------------------------------------------------------
// Load .env manually
// ---------------------------------------------------------------------------
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) continue;
        [$k, $v] = explode('=', $line, 2);
        $k = trim($k); $v = trim($v);
        if (strlen($v) >= 2 &&
            (($v[0] === '"' && $v[-1] === '"') || ($v[0] === "'" && $v[-1] === "'"))) {
            $v = substr($v, 1, -1);
        }
        $_ENV[$k] = $v;
        putenv("{$k}={$v}");
    }
}

// ---------------------------------------------------------------------------
// Connect to MySQL directly
// ---------------------------------------------------------------------------
$host   = $_ENV['DB_HOST'] ?? 'localhost';
$port   = $_ENV['DB_PORT'] ?? '3306';
$dbname = $_ENV['DB_NAME'] ?? 'waterlift_solar';
$user   = $_ENV['DB_USER'] ?? 'root';
$pass   = $_ENV['DB_PASS'] ?? 'mwalatvc';

try {
    $db = new PDO(
        "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    echo "\n✗ Database connection failed: " . $e->getMessage() . "\n";
    echo "Check DB_HOST, DB_NAME, DB_USER, DB_PASS in backend/.env\n\n";
    exit(1);
}

// ---------------------------------------------------------------------------
// Admin credentials — edit these before running
// ---------------------------------------------------------------------------
$username  = 'Solar';
$email     = 'admin@waterliftsolar.co.ke';
$password  = 'Waterlift&27';
$full_name = 'Administrator';
// ---------------------------------------------------------------------------

$hash = password_hash($password, PASSWORD_BCRYPT);

try {
    // Delete any existing admin rows with matching username OR email to avoid conflicts
    $del = $db->prepare('DELETE FROM admins WHERE username = :u OR email = :e');
    $del->execute([':u' => $username, ':e' => $email]);

    $ins = $db->prepare(
        'INSERT INTO admins (username, email, password_hash, full_name)
         VALUES (:username, :email, :hash, :full_name)'
    );
    $ins->execute([
        ':username'  => $username,
        ':email'     => $email,
        ':hash'      => $hash,
        ':full_name' => $full_name,
    ]);

    echo "\n✓ Admin account ready.\n\n";
    echo "  Username : {$username}\n";
    echo "  Password : {$password}\n";
    echo "\nLogin at: http://localhost:5173/admin/login\n\n";

} catch (Exception $e) {
    echo "\n✗ Error: " . $e->getMessage() . "\n";
    exit(1);
}
