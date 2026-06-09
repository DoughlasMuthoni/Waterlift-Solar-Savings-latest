<?php

declare(strict_types=1);

/**
 * LeadsController — public lead capture + admin management endpoints.
 */
class LeadsController
{
    private Lead $leadModel;

    private const VALID_SCHOOL_TYPES = [
        'private_day', 'private_boarding', 'public_day', 'public_boarding',
        'primary', 'secondary', 'boarding', 'polytechnic', 'university', 'other',
    ];

    private const VALID_STATUSES = [
        'new', 'contacted', 'quoted', 'converted', 'closed',
    ];

    public function __construct(PDO $db)
    {
        require_once __DIR__ . '/../models/Lead.php';
        $this->leadModel = new Lead($db);
    }

    // ------------------------------------------------------------------
    // POST /api/leads  (public)
    // ------------------------------------------------------------------

    /**
     * Accept a new lead from the public contact/enquiry form.
     */
    public function store(): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        require_once __DIR__ . '/../helpers/Validator.php';
        $missing = Validator::required($body, ['school_name', 'school_type', 'contact_name', 'phone']);
        if ($missing) {
            Response::error(
                'Missing required fields.',
                422,
                array_fill_keys($missing, 'This field is required.')
            );
        }

        // Validate school_type enum
        if (!in_array($body['school_type'], self::VALID_SCHOOL_TYPES, true)) {
            Response::error('Invalid school_type value.', 422, [
                'school_type' => 'Must be one of: ' . implode(', ', self::VALID_SCHOOL_TYPES),
            ]);
        }

        // Validate email format if provided
        if (!empty($body['email']) && !Validator::email($body['email'])) {
            Response::error('Invalid email address.', 422, ['email' => 'Must be a valid email address.']);
        }

        // Sanitize string fields
        $sanitize = static fn(mixed $v): string => htmlspecialchars(strip_tags(trim((string) ($v ?? ''))));

        $data = [
            'school_name'    => $sanitize($body['school_name']),
            'school_type'    => $body['school_type'],
            'contact_name'   => $sanitize($body['contact_name']),
            'phone'          => $sanitize($body['phone']),
            'email'          => !empty($body['email'])          ? $sanitize($body['email'])          : null,
            'county'         => !empty($body['county'])         ? $sanitize($body['county'])         : null,
            'num_students'   => !empty($body['num_students'])   ? $body['num_students']              : null,
            'monthly_bill'   => !empty($body['monthly_bill'])   ? $body['monthly_bill']              : null,
            'preferred_plan' => !empty($body['preferred_plan']) ? $sanitize($body['preferred_plan']) : null,
            'message'        => !empty($body['message'])        ? $sanitize($body['message'])        : null,
            'status'         => 'new',
        ];

        $id = $this->leadModel->create($data);

        Response::json(['id' => $id], 201);
    }

    // ------------------------------------------------------------------
    // GET /api/admin/leads  (auth required)
    // ------------------------------------------------------------------

    /**
     * Return a paginated, optionally filtered list of leads.
     * Query params: ?status=&search=&page=&limit=
     */
    public function index(): void
    {
        $filters = [
            'status' => $_GET['status'] ?? null,
            'search' => $_GET['search'] ?? null,
            'page'   => isset($_GET['page'])  ? (int) $_GET['page']  : 1,
            'limit'  => isset($_GET['limit']) ? (int) $_GET['limit'] : 20,
        ];

        $result = $this->leadModel->findAll($filters);
        Response::json($result);
    }

    // ------------------------------------------------------------------
    // GET /api/admin/leads/{id}  (auth required)
    // ------------------------------------------------------------------

    /**
     * Return a single lead by ID.
     */
    public function show(int $id): void
    {
        $lead = $this->leadModel->findById($id);
        if ($lead === null) {
            Response::error('Lead not found.', 404);
        }
        Response::json($lead);
    }

    // ------------------------------------------------------------------
    // PATCH /api/admin/leads/{id}/status  (auth required)
    // ------------------------------------------------------------------

    /**
     * Update the status field of a lead.
     * Request body: { "status": "contacted" }
     */
    public function updateStatus(int $id): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        require_once __DIR__ . '/../helpers/Validator.php';
        $missing = Validator::required($body, ['status']);
        if ($missing) {
            Response::error('Missing required field: status.', 422, ['status' => 'This field is required.']);
        }

        $status = trim((string) $body['status']);
        if (!in_array($status, self::VALID_STATUSES, true)) {
            Response::error('Invalid status value.', 422, [
                'status' => 'Must be one of: ' . implode(', ', self::VALID_STATUSES),
            ]);
        }

        // Confirm lead exists
        if ($this->leadModel->findById($id) === null) {
            Response::error('Lead not found.', 404);
        }

        $updated = $this->leadModel->updateStatus($id, $status);
        if (!$updated) {
            Response::error('Failed to update lead status.', 500);
        }

        Response::json(['id' => $id, 'status' => $status]);
    }
}
