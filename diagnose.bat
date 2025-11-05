@echo off
echo ========================================
echo LifeSense AI - Quick Diagnostic
echo ========================================
echo.

echo Checking if server is running on port 3001...
echo.

curl -s http://localhost:3001/api/health > nul 2>&1

if %errorlevel% equ 0 (
    echo [SUCCESS] Server is running!
    echo.
    curl http://localhost:3001/api/health
    echo.
    echo.
    echo Now testing chat API...
    echo.
    node test-api.js
) else (
    echo [ERROR] Server is NOT running!
    echo.
    echo The chatbot won't work because the server isn't running.
    echo.
    echo TO FIX: Open a terminal and run:
    echo    cd "c:\Users\HP\Downloads\LifeSense AI\LifeSense-AI(Project)"
    echo    node server.js
    echo.
    echo Then run this diagnostic again.
)

echo.
echo ========================================
pause
