@echo off
setlocal enabledelayedexpansion

:: FoxCart — Setup script (Windows)
:: Usage: install.bat

echo.
echo ======================================
echo          FoxCart — Setup
echo ======================================
echo.

:: ── 1. Check prerequisites ──────────────────────────────────────────────────

echo [INFO] Checking prerequisites...

where docker >nul 2>&1
if %errorlevel% neq 0 (
    echo [FAIL] Docker is not installed. https://docs.docker.com/get-docker/
    exit /b 1
)

docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [FAIL] Docker daemon is not running. Start Docker Desktop and retry.
    exit /b 1
)

where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [FAIL] Git is not installed.
    exit /b 1
)

echo [OK]   Docker ^& Git found

:: ── 2. Environment file ─────────────────────────────────────────────────────

if not exist .env.local (
    echo [INFO] Creating .env.local from .env.example...
    copy .env.example .env.local >nul
    echo [OK]   .env.local created — edit it if you need custom values
) else (
    echo [OK]   .env.local already exists
)

:: ── 3. Build & start containers ─────────────────────────────────────────────

echo [INFO] Building and starting Docker containers...
docker compose build --quiet app
if %errorlevel% neq 0 (
    echo [FAIL] Docker build failed.
    exit /b 1
)

docker compose up -d
if %errorlevel% neq 0 (
    echo [FAIL] Docker compose up failed.
    exit /b 1
)

echo [INFO] Waiting for Postgres to be healthy...
set /a elapsed=0
:wait_pg
docker compose exec -T postgres pg_isready -U foxcart >nul 2>&1
if %errorlevel% neq 0 (
    timeout /t 1 /nobreak >nul
    set /a elapsed+=1
    if !elapsed! geq 30 (
        echo [FAIL] Postgres did not become healthy within 30s
        exit /b 1
    )
    goto wait_pg
)
echo [OK]   Postgres ready

echo [INFO] Waiting for Redis...
:wait_redis
for /f %%i in ('docker compose exec -T redis redis-cli ping 2^>nul') do set redis_res=%%i
if not "!redis_res!"=="PONG" (
    timeout /t 1 /nobreak >nul
    goto wait_redis
)
echo [OK]   Redis ready

:: ── 4. Wait for Next.js + Payload init ──────────────────────────────────────

echo [INFO] Waiting for Next.js to compile (first boot takes ~10s)...
set /a elapsed=0
:wait_app
curl -s -o nul http://localhost:3000/fr >nul 2>&1
if %errorlevel% neq 0 (
    timeout /t 2 /nobreak >nul
    set /a elapsed+=2
    if !elapsed! geq 60 (
        echo [FAIL] App did not start within 60s — check: docker compose logs app
        exit /b 1
    )
    goto wait_app
)
echo [OK]   App running

:: Trigger Payload schema init
curl -s -o nul http://localhost:3000/admin >nul 2>&1
timeout /t 2 /nobreak >nul
echo [OK]   Payload CMS initialized

:: ── 5. Summary ──────────────────────────────────────────────────────────────

echo.
echo ======================================
echo          Setup complete!
echo ======================================
echo.
echo   Site:      http://localhost:3000/fr
echo   Admin CMS: http://localhost:3000/admin
echo   Mailpit:   http://localhost:8025
echo.
echo   Commands:
echo     docker compose logs -f app    — stream app logs
echo     docker compose down           — stop everything
echo     docker compose down -v        — stop + wipe database
echo.
