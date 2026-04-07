<?php

declare(strict_types=1);

/**
 * TestimonialsController — public read + admin CRUD for testimonials.
 */
class TestimonialsController
{
    private Testimonial $model;

    public function __construct(PDO $db)
    {
        require_once __DIR__ . '/../models/Testimonial.php';
        $this->model = new Testimonial($db);
    }

    // ------------------------------------------------------------------
    // GET /api/testimonials  (public)
    // ------------------------------------------------------------------

    public function indexPublic(): void
    {
        Response::json($this->model->findActive());
    }

    // ------------------------------------------------------------------
    // GET /api/admin/testimonials  (auth)
    // ------------------------------------------------------------------

    public function index(): void
    {
        Response::json($this->model->findAll());
    }

    // ------------------------------------------------------------------
    // POST /api/admin/testimonials  (auth)
    // ------------------------------------------------------------------

    public function store(): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        require_once __DIR__ . '/../helpers/Validator.php';
        $missing = Validator::required($body, ['author_name', 'quote']);
        if ($missing) {
            Response::error(
                'Missing required fields.',
                422,
                array_fill_keys($missing, 'This field is required.')
            );
        }

        if (isset($body['rating']) && (!Validator::numeric($body['rating']) || (int) $body['rating'] < 1 || (int) $body['rating'] > 5)) {
            Response::error('Rating must be a number between 1 and 5.', 422, ['rating' => 'Must be 1–5.']);
        }

        $sanitize = static fn(mixed $v): string => htmlspecialchars(strip_tags(trim((string) ($v ?? ''))));

        $data = [
            'author_name' => $sanitize($body['author_name']),
            'school_name' => !empty($body['school_name']) ? $sanitize($body['school_name']) : null,
            'quote'       => $sanitize($body['quote']),
            'rating'      => isset($body['rating'])    ? (int) $body['rating']  : 5,
            'photo_url'   => !empty($body['photo_url']) ? $sanitize($body['photo_url']) : null,
            'active'      => isset($body['active'])    ? (bool) $body['active'] : true,
        ];

        $id = $this->model->create($data);
        Response::json(['id' => $id], 201);
    }

    // ------------------------------------------------------------------
    // PUT /api/admin/testimonials/{id}  (auth)
    // ------------------------------------------------------------------

    public function update(int $id): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($body)) {
            Response::error('Request body is empty.', 422);
        }

        if (isset($body['rating']) && (!Validator::numeric($body['rating']) || (int) $body['rating'] < 1 || (int) $body['rating'] > 5)) {
            Response::error('Rating must be a number between 1 and 5.', 422, ['rating' => 'Must be 1–5.']);
        }

        $sanitize = static fn(mixed $v): string => htmlspecialchars(strip_tags(trim((string) ($v ?? ''))));

        $data = [];
        $stringFields = ['author_name', 'school_name', 'quote', 'photo_url'];
        foreach ($stringFields as $field) {
            if (array_key_exists($field, $body)) {
                $data[$field] = $body[$field] !== null ? $sanitize($body[$field]) : null;
            }
        }
        if (array_key_exists('rating', $body)) {
            $data['rating'] = (int) $body['rating'];
        }
        if (array_key_exists('active', $body)) {
            $data['active'] = (bool) $body['active'];
        }

        $updated = $this->model->update($id, $data);
        if (!$updated) {
            // Could be not found or no actual change — check existence
            Response::error('Testimonial not found or no changes made.', 404);
        }

        Response::json(['id' => $id, 'updated' => true]);
    }

    // ------------------------------------------------------------------
    // DELETE /api/admin/testimonials/{id}  (auth)
    // ------------------------------------------------------------------

    public function destroy(int $id): void
    {
        $deleted = $this->model->delete($id);
        if (!$deleted) {
            Response::error('Testimonial not found.', 404);
        }
        Response::json(['id' => $id, 'deleted' => true]);
    }

    // ------------------------------------------------------------------
    // PATCH /api/admin/testimonials/{id}/toggle  (auth)
    // ------------------------------------------------------------------

    public function toggleActive(int $id): void
    {
        $toggled = $this->model->toggleActive($id);
        if (!$toggled) {
            Response::error('Testimonial not found.', 404);
        }
        Response::json(['id' => $id, 'toggled' => true]);
    }
}
