<?php

declare(strict_types=1);

class UploadController
{
    public function __construct(private PDO $db) {}

    // ------------------------------------------------------------------
    // POST /api/admin/upload  (auth)
    // ------------------------------------------------------------------

    public function image(): void
    {
        if (empty($_FILES['image'])) {
            Response::error('No file received. Send the file in a field named "image".', 422);
        }

        $file = $_FILES['image'];

        if ($file['error'] !== UPLOAD_ERR_OK) {
            $msg = match ($file['error']) {
                UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'File exceeds the maximum allowed size.',
                UPLOAD_ERR_NO_FILE                         => 'No file was uploaded.',
                default                                    => 'Upload failed (error code ' . $file['error'] . ').',
            };
            Response::error($msg, 422);
        }

        // 5 MB limit
        if ($file['size'] > 5 * 1024 * 1024) {
            Response::error('File is too large. Maximum size is 5 MB.', 422);
        }

        // Validate MIME type from actual file contents (not the client header)
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime  = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        $extMap = [
            'image/jpeg' => 'jpg',
            'image/png'  => 'png',
            'image/webp' => 'webp',
            'image/gif'  => 'gif',
        ];

        if (!array_key_exists($mime, $extMap)) {
            Response::error('Invalid file type. Allowed formats: JPG, PNG, WebP, GIF.', 422);
        }

        $ext      = $extMap[$mime];
        $filename = 'blog_' . uniqid('', true) . '.' . $ext;

        // Save to public_html/uploads/blogs/
        // __DIR__ = public_html/controllers  →  ../ = public_html/
        $uploadDir = __DIR__ . '/../uploads/blogs/';

        if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true) && !is_dir($uploadDir)) {
            Response::error('Could not create upload directory.', 500);
        }

        if (!move_uploaded_file($file['tmp_name'], $uploadDir . $filename)) {
            Response::error('Failed to save the uploaded file.', 500);
        }

        Response::json(['url' => '/uploads/blogs/' . $filename], 201);
    }
}
