#!/usr/bin/env bash
# =============================================================================
# Trewe — New Engineer Setup Script
# Works on macOS (zsh / bash) and Ubuntu 22.04+.
# Run once from the repository root: bash scripts/setup.sh
# =============================================================================

set -euo pipefail

# Colour helpers
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RESET='\033[0m'

info()    { echo -e "${CYAN}▶ $*${RESET}"; }
success() { echo -e "${GREEN}✓ $*${RESET}"; }
warn()    { echo -e "${YELLOW}⚠ $*${RESET}"; }
error()   { echo -e "${RED}✖ $*${RESET}"; }

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   Trewe — Developer Environment Setup ║"
echo "╚══════════════════════════════════════╝"
echo ""

# =============================================================================
# Step 1: Check required tools
# =============================================================================
info "Step 1/8 — Checking required tools"

check_tool() {
  local cmd="$1"
  local min_version="$2"
  local install_url="$3"

  if ! command -v "$cmd" &>/dev/null; then
    error "Required tool not found: $cmd"
    error "Install it from: $install_url"
    return 1
  fi
  success "$cmd found"
}

MISSING=0

# Docker
if ! command -v docker &>/dev/null; then
  error "Docker is not installed."
  error "Install from: https://docs.docker.com/get-docker/"
  MISSING=1
else
  if ! docker info &>/dev/null 2>&1; then
    error "Docker is installed but the daemon is not running. Please start Docker."
    MISSING=1
  else
    success "Docker $(docker --version | awk '{print $3}' | tr -d ',')"
  fi
fi

# Node.js 20+
if ! command -v node &>/dev/null; then
  error "Node.js is not installed."
  error "Install from: https://nodejs.org/en/download (v20 LTS recommended)"
  error "Or use a version manager: https://github.com/nvm-sh/nvm"
  MISSING=1
else
  NODE_MAJOR=$(node --version | sed 's/v//' | cut -d. -f1)
  if [ "$NODE_MAJOR" -lt 20 ]; then
    error "Node.js v20+ is required. Found: $(node --version)"
    error "Upgrade from: https://nodejs.org/en/download"
    MISSING=1
  else
    success "Node.js $(node --version)"
  fi
fi

# npm 10+
if ! command -v npm &>/dev/null; then
  error "npm is not installed (should come with Node.js)."
  MISSING=1
else
  NPM_MAJOR=$(npm --version | cut -d. -f1)
  if [ "$NPM_MAJOR" -lt 10 ]; then
    warn "npm v10+ recommended. Found: $(npm --version). Upgrading..."
    npm install -g npm@latest
  else
    success "npm $(npm --version)"
  fi
fi

if [ "$MISSING" -ne 0 ]; then
  echo ""
  error "One or more required tools are missing. Please install them and re-run this script."
  exit 1
fi

echo ""

# =============================================================================
# Step 2: Copy .env.example → .env.local
# =============================================================================
info "Step 2/8 — Environment file"

if [ ! -f .env.local ]; then
  cp .env.example .env.local
  success "Created .env.local from .env.example"
  warn "Review .env.local and set a strong POSTGRES_PASSWORD before continuing."
  echo ""
  read -rp "  Press ENTER when you have reviewed .env.local... "
else
  success ".env.local already exists — skipping"
fi

echo ""

# =============================================================================
# Step 3: Start Docker services
# =============================================================================
info "Step 3/8 — Starting Docker services"

docker compose --env-file .env.local up -d

success "Docker services started"
echo ""

# =============================================================================
# Step 4: Wait for PostgreSQL to be healthy
# =============================================================================
info "Step 4/8 — Waiting for PostgreSQL (max 30s)"

# Load POSTGRES_USER from .env.local
POSTGRES_USER_VAL=$(grep '^POSTGRES_USER=' .env.local | cut -d= -f2 | tr -d '"')
POSTGRES_DB_VAL=$(grep '^POSTGRES_DB=' .env.local | cut -d= -f2 | tr -d '"')
POSTGRES_USER_VAL="${POSTGRES_USER_VAL:-trewe}"
POSTGRES_DB_VAL="${POSTGRES_DB_VAL:-trewe_dev}"

RETRIES=0
MAX_RETRIES=30
until docker compose --env-file .env.local exec -T postgres \
  pg_isready -U "$POSTGRES_USER_VAL" -d "$POSTGRES_DB_VAL" &>/dev/null; do
  RETRIES=$((RETRIES + 1))
  if [ "$RETRIES" -ge "$MAX_RETRIES" ]; then
    error "PostgreSQL did not become healthy within 30 seconds."
    error "Check logs with: docker compose logs postgres"
    exit 1
  fi
  sleep 1
done

success "PostgreSQL is ready"
echo ""

# =============================================================================
# Step 5: Install npm dependencies
# =============================================================================
info "Step 5/8 — Installing npm dependencies"

npm ci

success "Dependencies installed"
echo ""

# =============================================================================
# Step 6: Run database migrations
# =============================================================================
info "Step 6/8 — Running database migrations"

npm run --workspace=packages/db migrate

success "Migrations complete"
echo ""

# =============================================================================
# Step 7: Seed development data
# =============================================================================
info "Step 7/8 — Seeding development data"

npm run --workspace=packages/db seed

success "Seed data loaded"
echo ""

# =============================================================================
# Step 8: Run the test suite
# =============================================================================
info "Step 8/8 — Running test suite"

if npm test --workspaces --if-present; then
  success "All tests passed"
else
  warn "Some tests failed — check the output above."
  warn "This may be expected on a fresh scaffold with no test files yet."
fi

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   ✓  Setup complete!                      ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo -e "  Dashboard:  ${CYAN}http://localhost:3000${RESET}"
echo -e "  API:        ${CYAN}http://localhost:4000/health${RESET}"
echo -e "  pgAdmin:    ${CYAN}http://localhost:5050${RESET}"
echo ""
echo "  Start the API:       npm run --workspace=packages/api dev"
echo "  Start the dashboard: npm run --workspace=packages/dashboard dev"
echo "  All services:        make up"
echo ""
