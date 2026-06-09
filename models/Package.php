<?php

declare(strict_types=1);

class Package
{
    public function __construct(private PDO $db) {}

    public function findActive(): array
    {
        $stmt = $this->db->query(
            'SELECT id, name, badge, popular, tagline, features, note, sort_order
               FROM packages
              WHERE active = 1
              ORDER BY sort_order ASC, id ASC'
        );
        return array_map([$this, 'decode'], $stmt->fetchAll());
    }

    public function findAll(): array
    {
        $stmt = $this->db->query(
            'SELECT id, name, badge, popular, tagline, features, note, active, sort_order, created_at
               FROM packages
              ORDER BY sort_order ASC, id ASC'
        );
        return array_map([$this, 'decode'], $stmt->fetchAll());
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT id, name, badge, popular, tagline, features, note, active, sort_order, created_at
               FROM packages WHERE id = :id LIMIT 1'
        );
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row ? $this->decode($row) : null;
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO packages (name, badge, popular, tagline, features, note, active, sort_order)
             VALUES (:name, :badge, :popular, :tagline, :features, :note, :active, :sort_order)'
        );
        $stmt->execute([
            ':name'       => $data['name'],
            ':badge'      => $data['badge']      ?? null,
            ':popular'    => (int)(bool)($data['popular'] ?? false),
            ':tagline'    => $data['tagline']    ?? null,
            ':features'   => json_encode($data['features'] ?? []),
            ':note'       => $data['note']       ?? null,
            ':active'     => (int)(bool)($data['active'] ?? true),
            ':sort_order' => (int)($data['sort_order'] ?? 0),
        ]);
        return (int)$this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [':id' => $id];
        $allowed = ['name', 'badge', 'popular', 'tagline', 'features', 'note', 'active', 'sort_order'];
        foreach ($allowed as $field) {
            if (!array_key_exists($field, $data)) continue;
            $fields[] = "{$field} = :{$field}";
            $params[":{$field}"] = match ($field) {
                'popular', 'active' => (int)(bool)$data[$field],
                'sort_order'        => (int)$data[$field],
                'features'          => json_encode(is_array($data[$field]) ? $data[$field] : []),
                default             => $data[$field],
            };
        }
        if (empty($fields)) return false;
        $stmt = $this->db->prepare('UPDATE packages SET ' . implode(', ', $fields) . ' WHERE id = :id');
        $stmt->execute($params);
        return $stmt->rowCount() > 0;
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM packages WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() > 0;
    }

    public function countActive(): int
    {
        return (int)$this->db->query('SELECT COUNT(*) FROM packages WHERE active = 1')->fetchColumn();
    }

    private function decode(array $row): array
    {
        if (isset($row['features']) && is_string($row['features'])) {
            $row['features'] = json_decode($row['features'], true) ?? [];
        }
        if (isset($row['popular'])) $row['popular'] = (bool)$row['popular'];
        if (isset($row['active']))  $row['active']  = (bool)$row['active'];
        return $row;
    }
}
