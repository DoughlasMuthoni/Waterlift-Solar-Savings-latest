<?php

declare(strict_types=1);

/**
 * Input validation helper — all methods are static.
 */
class Validator
{
    /**
     * Check that all specified fields exist and are non-empty in $data.
     *
     * @param  array    $data   Associative array of input values.
     * @param  string[] $fields List of required field names.
     * @return string[]         List of missing / empty field names.
     */
    public static function required(array $data, array $fields): array
    {
        $missing = [];
        foreach ($fields as $field) {
            $value = $data[$field] ?? null;
            if ($value === null || (is_string($value) && trim($value) === '')) {
                $missing[] = $field;
            }
        }
        return $missing;
    }

    /**
     * Validate an e-mail address format.
     *
     * @param  mixed $email Value to test.
     * @return bool
     */
    public static function email(mixed $email): bool
    {
        if (!is_string($email)) {
            return false;
        }
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Check that a string value meets a minimum length.
     *
     * @param  mixed $val Value to test (will be cast to string).
     * @param  int   $min Minimum character count.
     * @return bool
     */
    public static function minLength(mixed $val, int $min): bool
    {
        return mb_strlen((string) $val) >= $min;
    }

    /**
     * Check that a value is numeric (integer or float).
     *
     * @param  mixed $val Value to test.
     * @return bool
     */
    public static function numeric(mixed $val): bool
    {
        return is_numeric($val);
    }
}
