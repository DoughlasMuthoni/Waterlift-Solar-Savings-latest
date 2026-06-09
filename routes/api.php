<?php

declare(strict_types=1);

/**
 * Route table.
 *
 * Each entry is an array with:
 *   [0] HTTP method  (string)
 *   [1] URI pattern  (string) — use {id} for a numeric path parameter
 *   [2] Controller class name (string, no namespace)
 *   [3] Controller method    (string)
 *   [4] Requires auth?       (bool, optional — defaults to false)
 *
 * @return list<array>
 */
return [
    // Auth
    ['POST', '/api/auth/login',  'AuthController', 'login'],
    ['POST', '/api/auth/logout', 'AuthController', 'logout'],

    // Public lead capture
    ['POST', '/api/leads', 'LeadsController', 'store'],

    // Admin: Leads
    ['GET',   '/api/admin/leads',             'LeadsController', 'index',        true],
    ['GET',   '/api/admin/leads/{id}',        'LeadsController', 'show',         true],
    ['PATCH', '/api/admin/leads/{id}/status', 'LeadsController', 'updateStatus', true],

    // Public testimonials
    ['GET', '/api/testimonials', 'TestimonialsController', 'indexPublic'],

    // Admin: Testimonials
    ['GET',    '/api/admin/testimonials',              'TestimonialsController', 'index',        true],
    ['POST',   '/api/admin/testimonials',              'TestimonialsController', 'store',        true],
    ['PUT',    '/api/admin/testimonials/{id}',         'TestimonialsController', 'update',       true],
    ['DELETE', '/api/admin/testimonials/{id}',         'TestimonialsController', 'destroy',      true],
    ['PATCH',  '/api/admin/testimonials/{id}/toggle',  'TestimonialsController', 'toggleActive', true],

    // Public FAQs
    ['GET', '/api/faqs', 'FaqsController', 'indexPublic'],

    // Admin: FAQs
    ['GET',    '/api/admin/faqs',        'FaqsController', 'index',   true],
    ['POST',   '/api/admin/faqs',        'FaqsController', 'store',   true],
    ['PUT',    '/api/admin/faqs/{id}',   'FaqsController', 'update',  true],
    ['DELETE', '/api/admin/faqs/{id}',   'FaqsController', 'destroy', true],

    // Public packages
    ['GET', '/api/packages', 'PackagesController', 'indexPublic'],

    // Admin: Packages
    ['GET',    '/api/admin/packages',      'PackagesController', 'index',   true],
    ['POST',   '/api/admin/packages',      'PackagesController', 'store',   true],
    ['PUT',    '/api/admin/packages/{id}', 'PackagesController', 'update',  true],
    ['DELETE', '/api/admin/packages/{id}', 'PackagesController', 'destroy', true],

    // Public settings
    ['GET', '/api/settings',            'SettingsController', 'indexPublic'],
    ['GET', '/api/calculator-settings', 'SettingsController', 'calculatorPublic'],

    // Admin: Settings
    ['GET',  '/api/admin/settings', 'SettingsController', 'index',  true],
    ['POST', '/api/admin/settings', 'SettingsController', 'update', true],

    // Admin: File upload
    ['POST', '/api/admin/upload', 'UploadController', 'image', true],

    // Public blogs
    ['GET', '/api/blogs',         'BlogController', 'indexPublic'],
    ['GET', '/api/blogs/{slug}',  'BlogController', 'showPublic'],

    // Admin: Blogs
    ['GET',    '/api/admin/blogs',       'BlogController', 'index',   true],
    ['POST',   '/api/admin/blogs',       'BlogController', 'store',   true],
    ['PUT',    '/api/admin/blogs/{id}',  'BlogController', 'update',  true],
    ['DELETE', '/api/admin/blogs/{id}',  'BlogController', 'destroy', true],

    // Admin: Dashboard
    ['GET', '/api/admin/dashboard', 'DashboardController', 'stats', true],
];
