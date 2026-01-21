@echo off
REM Windows batch script to run all applications

setlocal enabledelayedexpansion

echo.
echo ========================================
echo React Vite Monorepo - All Apps Launcher
echo ========================================
echo.

REM Get the root directory
set "ROOT_DIR=%~dp0.."

echo Root Directory: %ROOT_DIR%
echo.

REM Check if node_modules exists
if not exist "%ROOT_DIR%\node_modules" (
    echo Installing dependencies...
    cd /d "%ROOT_DIR%"
    call npm install
    echo Dependencies installed!
    echo.
)

REM Start Shell Container
echo Starting Shell Container on port 5173...
start cmd /k "cd /d %ROOT_DIR%\packages\shell && set PORT=5173 && npm run dev"
timeout /t 2 /nobreak

REM Start App 1
echo Starting App 1 on port 5174...
start cmd /k "cd /d %ROOT_DIR%\packages\app1 && set PORT=5174 && npm run dev"
timeout /t 1 /nobreak

REM Start App 2
echo Starting App 2 on port 5175...
start cmd /k "cd /d %ROOT_DIR%\packages\app2 && set PORT=5175 && npm run dev"
timeout /t 1 /nobreak

REM Start App 3
echo Starting App 3 on port 5176...
start cmd /k "cd /d %ROOT_DIR%\packages\app3 && set PORT=5176 && npm run dev"

echo.
echo ========================================
echo All applications started!
echo ========================================
echo.
echo Access the applications:
echo   Shell Container: http://localhost:5173
echo   App 1:          http://localhost:5174
echo   App 2:          http://localhost:5175
echo   App 3:          http://localhost:5176
echo.

endlocal
