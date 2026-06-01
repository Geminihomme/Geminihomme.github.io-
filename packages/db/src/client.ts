import pg from "pg";

const { Pool } = pg;

// Singleton Pool — shared across the process lifetime.
// The connection string is read at module load time so misconfiguration
// fails fast rather than at the first query.
let _pool: pg.Pool | undefined;

export function getPool(): pg.Pool {
  if (_pool) return _pool;

  const connectionString = process.env["DATABASE_URL"];
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  _pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

  _pool.on("error", (err) => {
    console.error("Unexpected PostgreSQL pool error", err);
  });

  return _pool;
}

export async function closePool(): Promise<void> {
  if (_pool) {
    await _pool.end();
    _pool = undefined;
  }
}

export type { pg };
