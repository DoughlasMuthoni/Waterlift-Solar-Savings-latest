<?php

declare(strict_types=1);

/**
 * Lead model — manages sales lead records.
 */
class Lead
{
    /** Valid status values matching the DB ENUM */
    private const VALID_STATUSES = ['new', 'contacted', 'quoted', 'converted', 'closed'];

    public function __construct(private PDO $db) {}

    /**
     * Insert a new lead record.
     *
     * @param  array<string, mixed> $data
     * @return int Inserted row ID.
     */
    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO leads
                (school_name, school_type, contact_name, phone, email,
                 county, num_students, monthly_bill, preferred_plan, message, status)
             VALUES
                (:school_name, :school_type, :contact_name, :phone, :email,
                 :county, :num_students, :monthly_bill, :preferred_plan, :message, :status)'
        );

        $stmt->execute([
            ':school_name'    => $data['school_name'],
            ':school_type'    => $data['school_type'],
            ':contact_name'   => $data['contact_name'],
            ':phone'          => $data['phone'],
            ':email'          => $data['email']          ?? null,
            ':county'         => $data['county']         ?? null,
            ':num_students'   => isset($data['num_students']) && $data['num_students'] !== ''
                                    ? (int) $data['num_students'] : null,
            ':monthly_bill'   => isset($data['monthly_bill']) && $data['monthly_bill'] !== ''
                                    ? (float) $data['monthly_bill'] : null,
            ':preferred_plan' => $data['preferred_plan'] ?? null,
            ':message'        => $data['message']        ?? null,
            ':status'         => $data['status']         ?? 'new',
        ]);

        return (int) $this->db->lastInsertId();
    }

    /**
     * Retrieve all leads with optional filtering.
     *
     * Supported keys in $filters:
     *   - status (string): filter by lead status
     *   - search (string): partial match on school_name or contact_name
     *   - page   (int):    1-based page number (default 1)
     *   - limit  (int):    rows per page (default 20, max 100)
     *
     * @param  array<string, mixed> $filters
     * @return array{data: list<array>, total: int, page: int, limit: int, pages: int}
     */
    public function findAll(array $filters = []): array
    {
        $where  = [];
        $params = [];

        if (!empty($filters['status']) && in_array($filters['status'], self::VALID_STATUSES, true)) {
            $where[]            = 'status = :status';
            $params[':status']  = $filters['status'];
        }

        if (!empty($filters['search'])) {
            $where[]            = '(school_name LIKE :search OR contact_name LIKE :search)';
            $params[':search']  = '%' . $filters['search'] . '%';
        }

        $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        // Count total for pagination
        $countSql  = "SELECT COUNT(*) FROM leads {$whereClause}";
        $countStmt = $this->db->prepare($countSql);
        $countStmt->execute($params);
        $total = (int) $countStmt->fetchColumn();

        // Pagination
        $limit  = min((int) ($filters['limit'] ?? 20), 100);
        $limit  = max($limit, 1);
        $page   = max((int) ($filters['page'] ?? 1), 1);
        $offset = ($page - 1) * $limit;

        $sql = "SELECT id, school_name, school_type, contact_name, phone, email,
                       county, num_students, monthly_bill, preferred_plan, message,
                       status, created_at
                  FROM leads
                {$whereClause}
                 ORDER BY created_at DESC
                 LIMIT :limit OFFSET :offset";

        $stmt = $this->db->prepare($sql);
        // Bind named params first
        foreach ($params as $key => $val) {
            $stmt->bindValue($key, $val);
        }
        $stmt->bindValue(':limit',  $limit,  PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        return [
            'data'  => $stmt->fetchAll(),
            'total' => $total,
            'page'  => $page,
            'limit' => $limit,
            'pages' => (int) ceil($total / $limit),
        ];
    }

    /**
     * Find a single lead by its primary key.
     *
     * @param  int $id
     * @return array<string, mixed>|null
     */
    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT id, school_name, school_type, contact_name, phone, email,
                    county, num_students, monthly_bill, preferred_plan, message,
                    status, created_at
               FROM leads
              WHERE id = :id
              LIMIT 1'
        );
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row !== false ? $row : null;
    }

    /**
     * Update the status of a lead.
     *
     * @param  int    $id
     * @param  string $status Must be one of VALID_STATUSES.
     * @return bool
     */
    public function updateStatus(int $id, string $status): bool
    {
        if (!in_array($status, self::VALID_STATUSES, true)) {
            return false;
        }
        $stmt = $this->db->prepare(
            'UPDATE leads SET status = :status WHERE id = :id'
        );
        $stmt->execute([':status' => $status, ':id' => $id]);
        return $stmt->rowCount() > 0;
    }

    /**
     * Return a count of leads grouped by status.
     *
     * @return array<string, int>  e.g. ['new' => 5, 'contacted' => 2, ...]
     */
    public function countByStatus(): array
    {
        $stmt = $this->db->query(
            'SELECT status, COUNT(*) AS cnt FROM leads GROUP BY status'
        );
        $rows   = $stmt->fetchAll();
        $result = [];
        foreach ($rows as $row) {
            $result[$row['status']] = (int) $row['cnt'];
        }
        return $result;
    }

    /**
     * Count leads created today.
     */
    public function countToday(): int
    {
        $stmt = $this->db->query(
            "SELECT COUNT(*) FROM leads WHERE DATE(created_at) = CURDATE()"
        );
        return (int) $stmt->fetchColumn();
    }

    /**
     * Count leads created in the current calendar week (Monday–Sunday).
     */
    public function countThisWeek(): int
    {
        $stmt = $this->db->query(
            "SELECT COUNT(*) FROM leads
              WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)"
        );
        return (int) $stmt->fetchColumn();
    }

    /**
     * Count all leads.
     */
    public function countTotal(): int
    {
        $stmt = $this->db->query('SELECT COUNT(*) FROM leads');
        return (int) $stmt->fetchColumn();
    }
}
