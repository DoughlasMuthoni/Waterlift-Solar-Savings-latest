<?php

declare(strict_types=1);

/**
 * FAQ model.
 */
class Faq
{
    public function __construct(private PDO $db) {}

    /**
     * Return all active FAQs ordered by sort_order ascending.
     *
     * @return list<array<string, mixed>>
     */
    public function findActive(): array
    {
        $stmt = $this->db->query(
            'SELECT id, question, answer, sort_order, active, created_at
               FROM faqs
              WHERE active = 1
              ORDER BY sort_order ASC, id ASC'
        );
        return $stmt->fetchAll();
    }

    /**
     * Return all FAQs regardless of active status.
     *
     * @return list<array<string, mixed>>
     */
    public function findAll(): array
    {
        $stmt = $this->db->query(
            'SELECT id, question, answer, sort_order, active, created_at
               FROM faqs
              ORDER BY sort_order ASC, id ASC'
        );
        return $stmt->fetchAll();
    }

    /**
     * Insert a new FAQ.
     *
     * @param  array<string, mixed> $data
     * @return int Inserted row ID.
     */
    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO faqs (question, answer, sort_order, active)
             VALUES (:question, :answer, :sort_order, :active)'
        );
        $stmt->execute([
            ':question'   => $data['question'],
            ':answer'     => $data['answer'],
            ':sort_order' => isset($data['sort_order']) ? (int) $data['sort_order'] : 0,
            ':active'     => isset($data['active'])     ? (int) (bool) $data['active'] : 1,
        ]);
        return (int) $this->db->lastInsertId();
    }

    /**
     * Update an existing FAQ.
     *
     * @param  int                  $id
     * @param  array<string, mixed> $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [':id' => $id];

        $allowed = ['question', 'answer', 'sort_order', 'active'];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $data)) {
                $fields[]            = "{$field} = :{$field}";
                $params[":{$field}"] = match ($field) {
                    'sort_order' => (int) $data[$field],
                    'active'     => (int) (bool) $data[$field],
                    default      => $data[$field],
                };
            }
        }

        if (empty($fields)) {
            return false;
        }

        $sql  = 'UPDATE faqs SET ' . implode(', ', $fields) . ' WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount() > 0;
    }

    /**
     * Delete a FAQ by ID.
     *
     * @param  int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM faqs WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() > 0;
    }

    /**
     * Count active FAQs.
     */
    public function countActive(): int
    {
        $stmt = $this->db->query('SELECT COUNT(*) FROM faqs WHERE active = 1');
        return (int) $stmt->fetchColumn();
    }
}
