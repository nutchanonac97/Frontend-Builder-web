@echo off
echo ==========================================
echo   Starting CMM Universal System...
echo ==========================================

:: 1. รัน Backend (.NET 8)
echo Starting Backend (.NET 8)...
start "CMM Backend API" dotnet run

:: รอ 3 วินาที ให้ Server ตื่นก่อน
timeout /t 3 /nobreak >nul

:: 2. รัน Frontend (React Vite)
echo Starting Frontend (React)...
cd client
start "CMM Frontend" npm run dev

