<?php

declare(strict_types=1);

/**
 * FaqsController — public read + admin CRUD for FAQs.
 */
class FaqsController
{
    private Faq $model;

    public function __construct(PDO $db)
    {
        require_once __DIR__ . '/../models/Faq.php';
        $this->model = new Faq($db);
    }

    // ------------------------------------------------------------------
    // GET /api/faqs  (public)
    // ------------------------------------------------------------------

    public function indexPublic(): void
    {
        Response::json($this->model->findActive());
    }

    // ------------------------------------------------------------------
    // GET /api/admin/faqs  (auth)
    // ------------------------------------------------------------------

    public function index(): void
    {
        Response::json($this->model->findAll());
    }

    // ------------------------------------------------------------------
    // POST /api/admin/faqs  (auth)
    // ------------------------------------------------------------------

    public function store(): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        require_once __DIR__ . '/../helpers/Validator.php';
        $missing = Validator::required($body, ['question', 'answer']);
        if ($missing) {
            Response::error(
                'Missing required fields.',
                422,
                array_fill_keys($missing, 'This field is required.')
            );
        }

        if (isset($body['sort_order']) && !Validator::numeric($body['sort_order'])) {
            Response::error('sort_order must be a number.', 422, ['sort_order' => 'Must be numeric.']);
        }

        $sanitize = static fn(mixed $v): string => htmlspecialchars(strip_tags(trim((string) ($v ?? ''))));

        $data = [
            'question'   => $sanitize($body['question']),
            'answer'     => $sanitize($body['answer']),
            'sort_order' => isset($body['sort_order']) ? (int) $body['sort_order'] : 0,
            'active'     => isset($body['active'])     ? (bool) $body['active']    : true,
        ];

        $id = $this->model->create($data);
        Response::json(['id' => $id], 201);
    }

    // ------------------------------------------------------------------
    // PUT /api/admin/faqs/{id}  (auth)
    // ------------------------------------------------------------------

    public function update(int $id): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($body)) {
            Response::error('Request body is empty.', 422);
        }

        if (isset($body['sort_order']) && !Validator::numeric($body['sort_order'])) {
            Response::error('sort_order must be a number.', 422, ['sort_order' => 'Must be numeric.']);
        }

        $sanitize = static fn(mixed $v): string => htmlspecialchars(strip_tags(trim((string) ($v ?? ''))));

        $data = [];
        foreach (['question', 'answer'] as $field) {
            if (array_key_exists($field, $body)) {
                $data[$field] = $sanitize($body[$field]);
            }
        }
        if (array_key_exists('sort_order', $body)) {
            $data['sort_order'] = (int) $body['sort_order'];
        }
        if (array_key_exists('active', $body)) {
            $data['active'] = (bool) $body['active'];
        }

        $updated = $this->model->update($id, $data);
        if (!$updated) {
            Response::error('FAQ not found or no changes made.', 404);
        }

        Response::json(['id' => $id, 'updated' => true]);
    }

    // ------------------------------------------------------------------
    // DELETE /api/admin/faqs/{id}  (auth)
    // ------------------------------------------------------------------

    public function destroy(int $id): void
    {
        $deleted = $this->model->delete($id);
        if (!$deleted) {
            Response::error('FAQ not found.', 404);
        }
        Response::json(['id' => $id, 'deleted' => true]);
    }
}
