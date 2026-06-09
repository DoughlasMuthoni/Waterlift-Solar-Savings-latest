<?php

declare(strict_types=1);

require_once __DIR__ . '/SiteSetting.php';

/**
 * CalculatorSetting model — key/value store for calculator_settings table.
 * Inherits the full SiteSetting interface and simply overrides the table name.
 */
class CalculatorSetting extends SiteSetting
{
    protected string $table = 'calculator_settings';

    public function __construct(PDO $db)
    {
        parent::__construct($db);
    }
}
