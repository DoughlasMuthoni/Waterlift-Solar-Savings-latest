<?php

declare(strict_types=1);

/**
 * SiteSetting model — key/value store for site_settings table.
 */
class SiteSetting
{
    protected string $table = 'site_settings';

    public function __construct(protected PDO $db) {}

    /**
     * Return all settings as an associative key => value map.
     *
     * @return array<string, string|null>
     */
    public function getAll(): array
    {
        $stmt = $this->db->query(
            "SELECT setting_key, setting_value FROM {$this->table}"
        );
        $rows   = $stmt->fetchAll();
        $result = [];
        foreach ($rows as $row) {
            $result[$row['setting_key']] = $row['setting_value'];
        }
        return $result;
    }

    /**
     * Return the value for a single key, or null if it does not exist.
     *
     * @param  string $key
     * @return string|null
     */
    public function get(string $key): ?string
    {
        $stmt = $this->db->prepare(
            "SELECT setting_value FROM {$this->table} WHERE setting_key = :key LIMIT 1"
        );
        $stmt->execute([':key' => $key]);
        $row = $stmt->fetch();
        return $row !== false ? $row['setting_value'] : null;
    }

    /**
     * Upsert a single key/value pair.
     *
     * @param  string      $key
     * @param  string|null $value
     * @return bool
     */
    public function set(string $key, ?string $value): bool
    {
        $stmt = $this->db->prepare(
            "INSERT INTO {$this->table} (setting_key, setting_value)
             VALUES (:key, :value)
             ON DUPLICATE KEY UPDATE setting_value = :value2"
        );
        $stmt->execute([
            ':key'    => $key,
            ':value'  => $value,
            ':value2' => $value,
        ]);
        return true;
    }

    /**
     * Upsert multiple key/value pairs in a single transaction.
     *
     * @param  array<string, string|null> $data
     * @return bool
     */
    public function setBulk(array $data): bool
    {
        if (empty($data)) {
            return true;
        }

        $this->db->beginTransaction();
        try {
            foreach ($data as $key => $value) {
                $this->set((string) $key, $value !== null ? (string) $value : null);
            }
            $this->db->commit();
            return true;
        } catch (Throwable $e) {
            $this->db->rollBack();
            return false;
        }
    }
}
