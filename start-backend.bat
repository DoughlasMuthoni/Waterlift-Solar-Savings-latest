@echo off
title Waterlift Solar - PHP Backend Server
echo ============================================
echo  Waterlift Solar - PHP API Server
echo  Running on http://localhost:8000
echo  Press Ctrl+C to stop
echo ============================================
echo.
cd /d "%~dp0"
php -S localhost:8000 -t backend/public backend/public/index.php
pause
