<?php

declare(strict_types=1);

/**
 * SettingsController — site and calculator settings endpoints.
 */
class SettingsController
{
    private SiteSetting        $siteModel;
    private CalculatorSetting  $calcModel;

    public function __construct(PDO $db)
    {
        require_once __DIR__ . '/../models/SiteSetting.php';
        require_once __DIR__ . '/../models/CalculatorSetting.php';
        $this->siteModel = new SiteSetting($db);
        $this->calcModel = new CalculatorSetting($db);
    }

    // ------------------------------------------------------------------
    // GET /api/settings  (public)
    // ------------------------------------------------------------------

    public function indexPublic(): void
    {
        Response::json($this->siteModel->getAll());
    }

    // ------------------------------------------------------------------
    // GET /api/calculator-settings  (public)
    // ------------------------------------------------------------------

    public function calculatorPublic(): void
    {
        Response::json($this->calcModel->getAll());
    }

    // ------------------------------------------------------------------
    // GET /api/admin/settings  (auth)
    // ------------------------------------------------------------------

    public function index(): void
    {
        Response::json([
            'site'       => $this->siteModel->getAll(),
            'calculator' => $this->calcModel->getAll(),
        ]);
    }

    // ------------------------------------------------------------------
    // POST /api/admin/settings  (auth)
    // ------------------------------------------------------------------

    /**
     * Bulk-update site and/or calculator settings.
     *
     * Request body:
     *   { "site": { "phone": "...", ... }, "calculator": { "savings_percentage": "0.80" } }
     *
     * Both keys are optional — you may update only one group at a time.
     */
    public function update(): void
    {
        $body = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($body['site']) && empty($body['calculator'])) {
            Response::error('Request body must contain at least one of "site" or "calculator".', 422);
        }

        $errors = [];

        if (!empty($body['site']) && is_array($body['site'])) {
            $sanitized = [];
            foreach ($body['site'] as $key => $value) {
                $sanitized[htmlspecialchars(strip_tags(trim((string) $key)))] =
                    $value !== null ? htmlspecialchars(strip_tags(trim((string) $value))) : null;
            }
            if (!$this->siteModel->setBulk($sanitized)) {
                $errors[] = 'Failed to update site settings.';
            }
        }

        if (!empty($body['calculator']) && is_array($body['calculator'])) {
            $sanitized = [];
            foreach ($body['calculator'] as $key => $value) {
                $sanitized[htmlspecialchars(strip_tags(trim((string) $key)))] =
                    $value !== null ? htmlspecialchars(strip_tags(trim((string) $value))) : null;
            }
            if (!$this->calcModel->setBulk($sanitized)) {
                $errors[] = 'Failed to update calculator settings.';
            }
        }

        if ($errors) {
            Response::error(implode(' ', $errors), 500);
        }

        Response::json([
            'site'       => $this->siteModel->getAll(),
            'calculator' => $this->calcModel->getAll(),
        ]);
    }
}
