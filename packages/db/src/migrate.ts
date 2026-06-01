import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getPool, closePool } from "./client.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, "..", "migrations");

async function migrate(): Promise<void> {
  const pool = getPool();

  // Ensure the migrations tracking table exists.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename  TEXT PRIMARY KEY,
      run_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  const applied = await pool
    .query<{ filename: string }>("SELECT filename FROM schema_migrations ORDER BY filename")
    .then((r) => new Set(r.rows.map((row) => row.filename)));

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  let count = 0;
  for (const file of files) {
    if (applied.has(file)) continue;

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (filename) VALUES ($1)", [file]);
      await client.query("COMMIT");
      console.log(`  ✓ Applied migration: ${file}`);
      count++;
    } catch (err) {
      await client.query("ROLLBACK");
      throw new Error(`Migration ${file} failed: ${String(err)}`);
    } finally {
      client.release();
    }
  }

  if (count === 0) {
    console.log("  No pending migrations.");
  } else {
    console.log(`  ${count} migration(s) applied.`);
  }
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Migration error:", err);
    process.exit(1);
  })
  .finally(() => closePool());
