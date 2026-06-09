<?php

declare(strict_types=1);

class PackagesController
{
    private Package $model;

    public function __construct(PDO $db)
    {
        require_once __DIR__ . '/../models/Package.php';
        $this->model = new Package($db);
    }

    // GET /api/packages  (public)
    public function indexPublic(): void
    {
        Response::json($this->model->findActive());
    }

    // GET /api/admin/packages  (auth)
    public function index(): void
    {
        Response::json($this->model->findAll());
    }

    // POST /api/admin/packages  (auth)
    public function store(): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];
        if (empty(trim((string)($body['name'] ?? '')))) {
            Response::error('Package name is required.', 422, ['name' => 'This field is required.']);
        }
        $sanitize = static fn(mixed $v): string => htmlspecialchars(strip_tags(trim((string)($v ?? ''))));
        $features = [];
        if (!empty($body['features']) && is_array($body['features'])) {
            foreach ($body['features'] as $f) {
                $clean = $sanitize($f);
                if ($clean !== '') $features[] = $clean;
            }
        }
        $data = [
            'name'       => $sanitize($body['name']),
            'badge'      => !empty($body['badge'])   ? $sanitize($body['badge'])   : null,
            'popular'    => !empty($body['popular']),
            'tagline'    => !empty($body['tagline'])  ? $sanitize($body['tagline']) : null,
            'features'   => $features,
            'note'       => !empty($body['note'])     ? $sanitize($body['note'])    : null,
            'active'     => isset($body['active']) ? (bool)$body['active'] : true,
            'sort_order' => isset($body['sort_order']) ? (int)$body['sort_order'] : 0,
        ];
        $id = $this->model->create($data);
        Response::json(['id' => $id], 201);
    }

    // PUT /api/admin/packages/{id}  (auth)
    public function update(int $id): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];
        if (empty($body)) Response::error('Request body is empty.', 422);
        $sanitize = static fn(mixed $v): string => htmlspecialchars(strip_tags(trim((string)($v ?? ''))));
        $data = [];
        if (array_key_exists('name', $body))       $data['name']       = $sanitize($body['name']);
        if (array_key_exists('badge', $body))      $data['badge']      = $body['badge'] ? $sanitize($body['badge']) : null;
        if (array_key_exists('popular', $body))    $data['popular']    = (bool)$body['popular'];
        if (array_key_exists('tagline', $body))    $data['tagline']    = $body['tagline'] ? $sanitize($body['tagline']) : null;
        if (array_key_exists('note', $body))       $data['note']       = $body['note'] ? $sanitize($body['note']) : null;
        if (array_key_exists('active', $body))     $data['active']     = (bool)$body['active'];
        if (array_key_exists('sort_order', $body)) $data['sort_order'] = (int)$body['sort_order'];
        if (array_key_exists('features', $body) && is_array($body['features'])) {
            $features = [];
            foreach ($body['features'] as $f) {
                $clean = $sanitize($f);
                if ($clean !== '') $features[] = $clean;
            }
            $data['features'] = $features;
        }
        $updated = $this->model->update($id, $data);
        if (!$updated) Response::error('Package not found or no changes made.', 404);
        Response::json(['id' => $id, 'updated' => true]);
    }

    // DELETE /api/admin/packages/{id}  (auth)
    public function destroy(int $id): void
    {
        if (!$this->model->delete($id)) Response::error('Package not found.', 404);
        Response::json(['id' => $id, 'deleted' => true]);
    }
}
