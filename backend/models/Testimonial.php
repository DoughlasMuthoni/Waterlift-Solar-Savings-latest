<?php

declare(strict_types=1);

/**
 * Testimonial model.
 */
class Testimonial
{
    public function __construct(private PDO $db) {}

    /**
     * Return all active testimonials ordered by created_at ascending.
     *
     * @return list<array<string, mixed>>
     */
    public function findActive(): array
    {
        $stmt = $this->db->query(
            'SELECT id, author_name, school_name, quote, rating, photo_url, active, created_at
               FROM testimonials
              WHERE active = 1
              ORDER BY created_at ASC'
        );
        return $stmt->fetchAll();
    }

    /**
     * Return all testimonials regardless of active status.
     *
     * @return list<array<string, mixed>>
     */
    public function findAll(): array
    {
        $stmt = $this->db->query(
            'SELECT id, author_name, school_name, quote, rating, photo_url, active, created_at
               FROM testimonials
              ORDER BY created_at DESC'
        );
        return $stmt->fetchAll();
    }

    /**
     * Insert a new testimonial.
     *
     * @param  array<string, mixed> $data
     * @return int Inserted row ID.
     */
    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO testimonials (author_name, school_name, quote, rating, photo_url, active)
             VALUES (:author_name, :school_name, :quote, :rating, :photo_url, :active)'
        );
        $stmt->execute([
            ':author_name' => $data['author_name'],
            ':school_name' => $data['school_name'] ?? null,
            ':quote'       => $data['quote'],
            ':rating'      => isset($data['rating']) ? (int) $data['rating'] : 5,
            ':photo_url'   => $data['photo_url']    ?? null,
            ':active'      => isset($data['active']) ? (int) (bool) $data['active'] : 1,
        ]);
        return (int) $this->db->lastInsertId();
    }

    /**
     * Update an existing testimonial.
     *
     * @param  int                  $id
     * @param  array<string, mixed> $data
     * @return bool True if at least one row was changed.
     */
    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [':id' => $id];

        $allowed = ['author_name', 'school_name', 'quote', 'rating', 'photo_url', 'active'];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $data)) {
                $fields[]          = "{$field} = :{$field}";
                $params[":{$field}"] = match ($field) {
                    'rating' => (int) $data[$field],
                    'active' => (int) (bool) $data[$field],
                    default  => $data[$field],
                };
            }
        }

        if (empty($fields)) {
            return false;
        }

        $sql  = 'UPDATE testimonials SET ' . implode(', ', $fields) . ' WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount() > 0;
    }

    /**
     * Delete a testimonial by ID.
     *
     * @param  int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM testimonials WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() > 0;
    }

    /**
     * Toggle the active flag of a testimonial.
     *
     * @param  int $id
     * @return bool True if the row was found and updated.
     */
    public function toggleActive(int $id): bool
    {
        $stmt = $this->db->prepare(
            'UPDATE testimonials SET active = IF(active = 1, 0, 1) WHERE id = :id'
        );
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() > 0;
    }

    /**
     * Count active testimonials.
     */
    public function countActive(): int
    {
        $stmt = $this->db->query('SELECT COUNT(*) FROM testimonials WHERE active = 1');
        return (int) $stmt->fetchColumn();
    }
}
