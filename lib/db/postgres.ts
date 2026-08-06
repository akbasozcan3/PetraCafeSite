/**
 * PostgreSQL connection pool
 * Falls back gracefully if DATABASE_URL is not set (uses JSON file mode).
 */
import { Pool, type PoolClient } from "pg";

let _pool: Pool | null = null;

export function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!_pool) {
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.DATABASE_URL.includes("localhost") ||
        process.env.DATABASE_URL.includes("127.0.0.1")
          ? false
          : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
    _pool.on("error", (err) => {
      console.error("[DB] Unexpected pool error:", err.message);
    });
  }
  return _pool;
}

export function isPostgresEnabled(): boolean {
  return !!process.env.DATABASE_URL;
}

export async function withClient<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL not set");
  const client = await pool.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}

export async function query<T extends object = object>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL not set");
  const result = await pool.query<T>(sql, params);
  return result.rows;
}
