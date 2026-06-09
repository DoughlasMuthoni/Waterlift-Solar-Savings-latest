<?php

declare(strict_types=1);

class BlogController
{
    private Blog $model;

    public function __construct(PDO $db)
    {
        require_once __DIR__ . '/../models/Blog.php';
        $this->model = new Blog($db);
    }

    // ------------------------------------------------------------------
    // GET /api/blogs  (public)
    // ------------------------------------------------------------------

    public function indexPublic(): void
    {
        Response::json($this->model->findPublished());
    }

    // ------------------------------------------------------------------
    // GET /api/blogs/{slug}  (public)
    // ------------------------------------------------------------------

    public function showPublic(string $slug): void
    {
        $post = $this->model->findBySlug($slug);
        if (!$post) {
            Response::error('Post not found.', 404);
        }
        Response::json($post);
    }

    // ------------------------------------------------------------------
    // GET /api/admin/blogs  (auth)
    // ------------------------------------------------------------------

    public function index(): void
    {
        Response::json($this->model->findAll());
    }

    // ------------------------------------------------------------------
    // POST /api/admin/blogs  (auth)
    // ------------------------------------------------------------------

    public function store(): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        require_once __DIR__ . '/../helpers/Validator.php';
        $missing = Validator::required($body, ['title', 'slug']);
        if ($missing) {
            Response::error(
                'Missing required fields.',
                422,
                array_fill_keys($missing, 'This field is required.')
            );
        }

        $slug = trim((string) ($body['slug'] ?? ''));
        if ($this->model->slugExists($slug)) {
            Response::error('Slug already exists.', 422, ['slug' => 'This slug is already in use.']);
        }

        $s = static fn(mixed $v): string => trim((string) ($v ?? ''));

        $isPublished = isset($body['is_published']) ? (bool) $body['is_published'] : false;

        $data = [
            'title'              => htmlspecialchars(strip_tags($s($body['title']))),
            'slug'               => $slug,
            'excerpt'            => !empty($body['excerpt'])            ? htmlspecialchars(strip_tags($s($body['excerpt']))) : null,
            'content'            => !empty($body['content'])            ? $s($body['content']) : null,
            'category'           => !empty($body['category'])           ? htmlspecialchars(strip_tags($s($body['category']))) : null,
            'author'             => !empty($body['author'])             ? htmlspecialchars(strip_tags($s($body['author']))) : 'Waterlift Solar',
            'featured_image_url' => !empty($body['featured_image_url']) ? $s($body['featured_image_url']) : null,
            'read_time'          => isset($body['read_time'])           ? (int) $body['read_time'] : 3,
            'is_published'       => $isPublished,
            'featured'           => isset($body['featured'])            ? (bool) $body['featured'] : false,
            'tags'               => !empty($body['tags'])               ? htmlspecialchars(strip_tags($s($body['tags']))) : null,
            'published_at'       => $isPublished                        ? date('Y-m-d H:i:s') : null,
        ];

        $id = $this->model->create($data);
        Response::json(['id' => $id], 201);
    }

    // ------------------------------------------------------------------
    // PUT /api/admin/blogs/{id}  (auth)
    // ------------------------------------------------------------------

    public function update(int $id): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($body)) {
            Response::error('Request body is empty.', 422);
        }

        $s    = static fn(mixed $v): string => trim((string) ($v ?? ''));
        $data = [];

        if (array_key_exists('title', $body)) {
            $data['title'] = htmlspecialchars(strip_tags($s($body['title'])));
        }

        if (array_key_exists('slug', $body)) {
            $slug = trim((string) $body['slug']);
            if ($this->model->slugExists($slug, $id)) {
                Response::error('Slug already in use.', 422, ['slug' => 'This slug is already in use.']);
            }
            $data['slug'] = $slug;
        }

        foreach (['excerpt', 'category', 'author', 'tags'] as $field) {
            if (array_key_exists($field, $body)) {
                $data[$field] = $body[$field] !== null
                    ? htmlspecialchars(strip_tags($s($body[$field])))
                    : null;
            }
        }

        if (array_key_exists('content', $body)) {
            $data['content'] = $body['content'] !== null ? $s($body['content']) : null;
        }

        if (array_key_exists('featured_image_url', $body)) {
            $data['featured_image_url'] = $body['featured_image_url'] !== null
                ? $s($body['featured_image_url'])
                : null;
        }

        if (array_key_exists('read_time', $body)) {
            $data['read_time'] = (int) $body['read_time'];
        }

        if (array_key_exists('featured', $body)) {
            $data['featured'] = (bool) $body['featured'];
        }

        if (array_key_exists('is_published', $body)) {
            $nowPublishing = (bool) $body['is_published'];
            $data['is_published'] = $nowPublishing;
            // Stamp published_at on first publish only
            if ($nowPublishing) {
                $existing = $this->model->findById($id);
                if ($existing && empty($existing['published_at'])) {
                    $data['published_at'] = date('Y-m-d H:i:s');
                }
            }
        }

        $updated = $this->model->update($id, $data);
        if (!$updated) {
            Response::error('Post not found or no changes made.', 404);
        }

        Response::json(['id' => $id, 'updated' => true]);
    }

    // ------------------------------------------------------------------
    // DELETE /api/admin/blogs/{id}  (auth)
    // ------------------------------------------------------------------

    public function destroy(int $id): void
    {
        $deleted = $this->model->delete($id);
        if (!$deleted) {
            Response::error('Post not found.', 404);
        }
        Response::json(['id' => $id, 'deleted' => true]);
    }
}
