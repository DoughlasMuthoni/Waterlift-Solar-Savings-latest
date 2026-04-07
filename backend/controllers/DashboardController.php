<?php

declare(strict_types=1);

/**
 * DashboardController — admin statistics summary endpoint.
 */
class DashboardController
{
    private Lead        $leadModel;
    private Faq         $faqModel;
    private Testimonial $testimonialModel;
    private Package     $packageModel;

    public function __construct(PDO $db)
    {
        require_once __DIR__ . '/../models/Lead.php';
        require_once __DIR__ . '/../models/Faq.php';
        require_once __DIR__ . '/../models/Testimonial.php';
        require_once __DIR__ . '/../models/Package.php';
        $this->leadModel        = new Lead($db);
        $this->faqModel         = new Faq($db);
        $this->testimonialModel = new Testimonial($db);
        $this->packageModel     = new Package($db);
    }

    // ------------------------------------------------------------------
    // GET /api/admin/dashboard  (auth)
    // ------------------------------------------------------------------

    /**
     * Return aggregated statistics for the admin dashboard.
     *
     * Response shape:
     * {
     *   "total_leads": 42,
     *   "leads_today": 3,
     *   "leads_this_week": 12,
     *   "leads_by_status": { "new": 10, "contacted": 8, ... },
     *   "active_faqs": 6,
     *   "active_testimonials": 3
     * }
     */
    public function stats(): void
    {
        Response::json([
            'total_leads'         => $this->leadModel->countTotal(),
            'leads_today'         => $this->leadModel->countToday(),
            'leads_this_week'     => $this->leadModel->countThisWeek(),
            'leads_by_status'     => $this->leadModel->countByStatus(),
            'active_faqs'         => $this->faqModel->countActive(),
            'active_testimonials' => $this->testimonialModel->countActive(),
            'active_packages'     => $this->packageModel->countActive(),
        ]);
    }
}
