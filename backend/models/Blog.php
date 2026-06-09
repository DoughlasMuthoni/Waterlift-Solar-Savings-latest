<?php

declare(strict_types=1);

class Blog
{
    public function __construct(private PDO $db) {}

    public function findPublished(): array
    {
        $stmt = $this->db->query(
            'SELECT id, title, slug, excerpt, category, author, featured_image_url,
                    read_time, is_published, featured, tags, published_at, created_at
               FROM blogs
              WHERE is_published = 1
              ORDER BY COALESCE(published_at, created_at) DESC'
        );
        return $stmt->fetchAll();
    }

    public function findBySlug(string $slug): array|false
    {
        $stmt = $this->db->prepare(
            'SELECT * FROM blogs WHERE slug = :slug AND is_published = 1 LIMIT 1'
        );
        $stmt->execute([':slug' => $slug]);
        return $stmt->fetch();
    }

    public function findAll(): array
    {
        $stmt = $this->db->query(
            'SELECT id, title, slug, excerpt, category, author, featured_image_url,
                    read_time, is_published, featured, tags, published_at, created_at
               FROM blogs
              ORDER BY created_at DESC'
        );
        return $stmt->fetchAll();
    }

    public function findById(int $id): array|false
    {
        $stmt = $this->db->prepare('SELECT * FROM blogs WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $id]);
        return $stmt->fetch();
    }

    public function slugExists(string $slug, ?int $excludeId = null): bool
    {
        if ($excludeId !== null) {
            $stmt = $this->db->prepare(
                'SELECT COUNT(*) FROM blogs WHERE slug = :slug AND id != :id'
            );
            $stmt->execute([':slug' => $slug, ':id' => $excludeId]);
        } else {
            $stmt = $this->db->prepare('SELECT COUNT(*) FROM blogs WHERE slug = :slug');
            $stmt->execute([':slug' => $slug]);
        }
        return (int) $stmt->fetchColumn() > 0;
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO blogs
                (title, slug, excerpt, content, category, author,
                 featured_image_url, read_time, is_published, featured, tags, published_at)
             VALUES
                (:title, :slug, :excerpt, :content, :category, :author,
                 :featured_image_url, :read_time, :is_published, :featured, :tags, :published_at)'
        );
        $stmt->execute([
            ':title'              => $data['title'],
            ':slug'               => $data['slug'],
            ':excerpt'            => $data['excerpt']            ?? null,
            ':content'            => $data['content']            ?? null,
            ':category'           => $data['category']           ?? null,
            ':author'             => $data['author']             ?? 'Waterlift Solar',
            ':featured_image_url' => $data['featured_image_url'] ?? null,
            ':read_time'          => isset($data['read_time'])    ? (int) $data['read_time'] : 3,
            ':is_published'       => isset($data['is_published']) ? (int) (bool) $data['is_published'] : 0,
            ':featured'           => isset($data['featured'])     ? (int) (bool) $data['featured'] : 0,
            ':tags'               => $data['tags']               ?? null,
            ':published_at'       => $data['published_at']       ?? null,
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [':id' => $id];

        $allowed = [
            'title', 'slug', 'excerpt', 'content', 'category', 'author',
            'featured_image_url', 'read_time', 'is_published', 'featured', 'tags', 'published_at',
        ];

        foreach ($allowed as $field) {
            if (array_key_exists($field, $data)) {
                $fields[]            = "{$field} = :{$field}";
                $params[":{$field}"] = match ($field) {
                    'read_time'    => (int) $data[$field],
                    'is_published',
                    'featured'     => (int) (bool) $data[$field],
                    default        => $data[$field],
                };
            }
        }

        if (empty($fields)) {
            return false;
        }

        $stmt = $this->db->prepare(
            'UPDATE blogs SET ' . implode(', ', $fields) . ' WHERE id = :id'
        );
        $stmt->execute($params);
        return $stmt->rowCount() > 0;
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM blogs WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() > 0;
    }

    public function countAll(): int
    {
        return (int) $this->db->query('SELECT COUNT(*) FROM blogs')->fetchColumn();
    }

    public function countPublished(): int
    {
        return (int) $this->db->query('SELECT COUNT(*) FROM blogs WHERE is_published = 1')->fetchColumn();
    }
}
