# =============================================================================
# Trewe — Developer Makefile
# Targets work from the repository root.
# =============================================================================

.PHONY: up down reset migrate seed test logs shell-db help

# Load .env.local if it exists so Make can reference variables if needed.
-include .env.local

COMPOSE        := docker compose --env-file .env.local
COMPOSE_TEST   := docker compose -f docker-compose.test.yml --env-file .env.local

# Default target
help:
	@echo ""
	@echo "Trewe developer commands"
	@echo "────────────────────────"
	@echo "  make up        Start all local services (detached)"
	@echo "  make down      Stop all services"
	@echo "  make reset     Tear down volumes and restart fresh"
	@echo "  make migrate   Run pending database migrations"
	@echo "  make seed      Load seed data into the development database"
	@echo "  make test      Run the full test suite against the test database"
	@echo "  make logs      Tail logs from all running services"
	@echo "  make shell-db  Open a psql shell inside the postgres container"
	@echo ""

## Start all services in the background.
up:
	$(COMPOSE) up -d
	@echo "✓ Services started. pgAdmin: http://localhost:5050"

## Stop all services without removing volumes.
down:
	$(COMPOSE) down

## Destroy all volumes and restart from scratch.
reset:
	$(COMPOSE) down -v
	$(COMPOSE) up -d
	@echo "✓ Environment reset. Waiting for postgres to be healthy..."
	@$(COMPOSE) exec postgres sh -c 'until pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB; do sleep 1; done'
	$(MAKE) migrate
	$(MAKE) seed

## Run pending SQL migrations against the development database.
migrate:
	npm run --workspace=packages/db migrate

## Run the seed script to populate development data.
seed:
	npm run --workspace=packages/db seed

## Run the full test suite using the ephemeral test database.
test:
	$(COMPOSE_TEST) up -d
	@echo "Waiting for test postgres..."
	@$(COMPOSE_TEST) exec postgres sh -c 'until pg_isready -U $$POSTGRES_USER -d trewe_test; do sleep 1; done'
	TEST_DATABASE_URL=postgresql://$${POSTGRES_USER:-trewe}:$${POSTGRES_PASSWORD}@localhost:5433/trewe_test \
	  npm test --workspaces --if-present
	$(COMPOSE_TEST) down

## Tail logs from all docker compose services.
logs:
	$(COMPOSE) logs -f

## Open a psql shell inside the running postgres container.
shell-db:
	$(COMPOSE) exec postgres psql -U $${POSTGRES_USER:-trewe} -d $${POSTGRES_DB:-trewe_dev}
