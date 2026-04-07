@echo off
title Waterlift Solar - Frontend Dev Server
echo ============================================
echo  Waterlift Solar - React Frontend
echo  Running on http://localhost:5173
echo  Press Ctrl+C to stop
echo ============================================
echo.
cd /d "%~dp0frontend"
npm run dev
pause
