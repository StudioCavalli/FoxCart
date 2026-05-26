#!/usr/bin/env bash
set -euo pipefail

# FoxCart — Setup script
# Usage: ./install.sh

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

info()  { echo -e "${CYAN}[INFO]${NC} $1"; }
ok()    { echo -e "${GREEN}[OK]${NC}   $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
fail()  { echo -e "${RED}[FAIL]${NC} $1"; exit 1; }

echo ""
echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║         FoxCart — Setup               ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
echo ""

# ── 1. Check prerequisites ──────────────────────────────────────────────────

info "Checking prerequisites..."

command -v docker >/dev/null 2>&1 || fail "Docker is not installed. https://docs.docker.com/get-docker/"
docker info >/dev/null 2>&1     || fail "Docker daemon is not running. Start Docker Desktop and retry."
command -v git >/dev/null 2>&1   || fail "Git is not installed."

ok "Docker & Git found"

# ── 2. Environment file ─────────────────────────────────────────────────────

if [ ! -f .env.local ]; then
  info "Creating .env.local from .env.example..."
  cp .env.example .env.local
  ok ".env.local created — edit it if you need custom values"
else
  ok ".env.local already exists"
fi

# ── 3. Build & start containers ─────────────────────────────────────────────

info "Building and starting Docker containers..."
docker compose build --quiet app
docker compose up -d

info "Waiting for Postgres to be healthy..."
timeout=30
elapsed=0
until docker compose exec -T postgres pg_isready -U foxcart -q 2>/dev/null; do
  sleep 1
  elapsed=$((elapsed + 1))
  if [ "$elapsed" -ge "$timeout" ]; then
    fail "Postgres did not become healthy within ${timeout}s"
  fi
done
ok "Postgres ready"

info "Waiting for Redis..."
until docker compose exec -T redis redis-cli ping 2>/dev/null | grep -q PONG; do
  sleep 1
done
ok "Redis ready"

# ── 4. Wait for Next.js + Payload init ──────────────────────────────────────

info "Waiting for Next.js to compile (first boot takes ~10s)..."
timeout=60
elapsed=0
until curl -s -o /dev/null -w '' http://localhost:3000/fr 2>/dev/null; do
  sleep 2
  elapsed=$((elapsed + 2))
  if [ "$elapsed" -ge "$timeout" ]; then
    fail "App did not start within ${timeout}s — check: docker compose logs app"
  fi
done
ok "App running"

# Trigger Payload schema init by hitting /admin
curl -s -o /dev/null http://localhost:3000/admin 2>/dev/null || true
sleep 2
ok "Payload CMS initialized"

# ── 5. Summary ──────────────────────────────────────────────────────────────

echo ""
echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         Setup complete!               ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
echo ""
echo -e "  Site:      ${CYAN}http://localhost:3000/fr${NC}"
echo -e "  Admin CMS: ${CYAN}http://localhost:3000/admin${NC}"
echo -e "  Mailpit:   ${CYAN}http://localhost:8025${NC}"
echo ""
echo -e "  ${YELLOW}Commands:${NC}"
echo -e "    docker compose logs -f app    — stream app logs"
echo -e "    docker compose down           — stop everything"
echo -e "    docker compose down -v        — stop + wipe database"
echo ""
