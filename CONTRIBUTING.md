# Contributing to Trewe

This guide covers everything you need to develop, test, and ship changes to the Trewe platform.

---

## Table of Contents

1. [Local Environment](#local-environment)
2. [Branch Naming](#branch-naming)
3. [Commit Message Format](#commit-message-format)
4. [Writing and Running Tests](#writing-and-running-tests)
5. [Creating a Migration](#creating-a-migration)
6. [CI Pipeline](#ci-pipeline)

---

## Local Environment

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 20 LTS+ | [nodejs.org](https://nodejs.org) or [nvm](https://github.com/nvm-sh/nvm) |
| npm | 10+ | bundled with Node.js |
| Docker Desktop | latest | [docs.docker.com/get-docker](https://docs.docker.com/get-docker/) |

### First-time setup

Run the onboarding script. It handles everything in one go:

```bash
bash scripts/setup.sh
```

The script will:
1. Verify all required tools are present
2. Create `.env.local` from `.env.example`
3. Start Docker services (PostgreSQL, Redis, pgAdmin)
4. Install npm dependencies
5. Run database migrations
6. Seed development data
7. Run the test suite

### Day-to-day commands

```bash
make up          # Start all Docker services (detached)
make down        # Stop all services
make reset       # Destroy volumes and start fresh
make migrate     # Run pending migrations
make seed        # Reload seed data
make test        # Run tests against the ephemeral test DB
make logs        # Tail service logs
make shell-db    # psql shell inside the postgres container
```

### Service URLs

| Service | URL |
|---------|-----|
| Dashboard (Next.js) | http://localhost:3000 |
| API (Express) | http://localhost:4000 |
| pgAdmin | http://localhost:5050 |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

### Running a specific package

```bash
# Start the API in watch mode
npm run dev --workspace=packages/api

# Start the dashboard
npm run dev --workspace=packages/dashboard

# Type-check a single package
npm run typecheck --workspace=packages/connectors
```

### Adding a new package

1. Create the package directory under `packages/`
2. Add a `package.json` with `"name": "@trewe/<package-name>"`
3. Add a `tsconfig.json` that extends `../../tsconfig.base.json`
4. Register the package in the root `package.json` workspaces array:
   ```json
   "workspaces": ["packages/*"]
   ```
   (If you are using a glob this is already covered.)
5. Run `npm install` from the repository root to link the workspace.

---

## Branch Naming

Use one of these prefixes, followed by a short kebab-case description:

| Prefix | When to use |
|--------|-------------|
| `feat/` | New feature or capability |
| `fix/` | Bug fix |
| `chore/` | Tooling, deps, CI — no production code changes |
| `docs/` | Documentation only |
| `refactor/` | Code restructure with no behaviour change |
| `migration/` | Database schema changes |

**Examples:**

```
feat/shopify-webhook-handler
fix/oauth-state-validation
chore/upgrade-eslint-9
migration/add-orders-table
```

---

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<optional scope>): <short description>

[optional body]

[optional footer(s)]
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Tooling, dependency updates |
| `docs` | Documentation changes |
| `refactor` | Refactoring (no behaviour change) |
| `test` | Adding or updating tests |
| `ci` | CI / GitHub Actions changes |
| `perf` | Performance improvement |

### Examples

```
feat(shopify): add order sync endpoint

fix(auth): validate HMAC before processing OAuth callback

chore(deps): upgrade typescript to 5.5

ci: cache tsbuildinfo files to speed up incremental builds

feat(db)!: rename merchant shop_url column to shop_domain

BREAKING CHANGE: column renamed; migration 003 must be applied
```

Breaking changes must include `!` after the type and a `BREAKING CHANGE:` footer.

---

## Writing and Running Tests

We use Node.js's built-in test runner (`node:test`) — no external test framework needed.

### File conventions

- Test files live alongside the source they test: `src/foo.test.ts`
- Or in a `__tests__/` subdirectory within `src/`

### Writing a test

```typescript
import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("myFunction", () => {
  it("returns the expected value", () => {
    assert.equal(myFunction(1, 2), 3);
  });
});
```

### Running tests

```bash
# All packages
make test

# Single package (builds first, then tests)
npm run build --workspace=packages/db
npm test --workspace=packages/db

# Watch mode (re-run on file change)
node --test --watch packages/db/dist/**/*.test.js
```

Tests run against the ephemeral test database (port 5433) with `trewe_test` as the database name. The `TEST_DATABASE_URL` environment variable is set automatically by `make test`.

---

## Creating a Migration

1. **Create the migration file** in `packages/db/migrations/` with a numeric prefix:

   ```
   packages/db/migrations/002_add_orders_table.sql
   ```

   Naming convention: `NNN_descriptive_name.sql` where `NNN` is zero-padded and monotonically increasing.

2. **Write the migration** — always idempotent where possible, and always include a down comment:

   ```sql
   -- Migration 002: Add orders table
   -- Down: DROP TABLE IF EXISTS orders;

   CREATE TABLE IF NOT EXISTS orders (
     id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     merchant_id UUID        NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
     external_id TEXT        NOT NULL,
     status      TEXT        NOT NULL DEFAULT 'pending',
     total_price NUMERIC(10, 2),
     created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
     updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
     UNIQUE (merchant_id, external_id)
   );
   ```

3. **Apply the migration locally:**

   ```bash
   make migrate
   ```

4. **Verify** the schema in pgAdmin (http://localhost:5050) or via `make shell-db`.

5. **Test the migration** runs cleanly from scratch:

   ```bash
   make reset   # destroys volumes, restarts, and re-runs all migrations
   ```

### Rules for migrations

- **Never edit an already-applied migration file.** Create a new one instead.
- **Always include a down migration** as a comment (or as a separate `NNN_rollback.sql` file for complex rollbacks).
- **Prefer additive changes** (add columns, add tables) over destructive changes (drop columns). Make destructive changes in a separate follow-up migration after the application code that uses the old column has been deployed and verified.
- Changes to `packages/db/migrations/` require review from `@trewe/core-team` (enforced via CODEOWNERS).

---

## CI Pipeline

Every push to `main` and every pull request runs three jobs in sequence:

### 1. `lint-and-typecheck`

- Runs ESLint across all packages
- Runs `tsc --noEmit` across all packages
- **How to fix:** Run `npm run lint` and `npm run typecheck` locally and address all errors before pushing.

### 2. `test`

- Spins up PostgreSQL and Redis as GitHub Actions services
- Runs migrations against the test database
- Runs the full test suite with `npm test --workspaces`
- Uploads coverage reports as artifacts
- **How to fix:** Run `make test` locally. Check `packages/*/coverage/` for coverage detail.

### 3. `build`

- Builds all TypeScript packages with `tsc`
- Verifies that the expected build artifacts exist
- **How to fix:** Run `npm run build` locally and fix any compilation errors.

### Security workflow (weekly + on push to main)

- **`dependency-audit`**: runs `npm audit --audit-level=high`. Fails on high or critical CVEs. Fix by upgrading the affected dependency or adding an `npm audit` override with justification.
- **`secret-scanning`**: runs TruffleHog over the full git history. Fails on verified live secrets. If you accidentally commit a secret, rotate it immediately, then add it to the `.gitignore` and use `git filter-repo` to scrub the history.
