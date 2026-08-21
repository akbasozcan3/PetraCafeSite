/**
 * PostgreSQL connection pool
 * Falls back gracefully if DATABASE_URL is not set (uses JSON file mode).
 */
import { Pool, type PoolClient } from "pg";

let _pool: Pool | null = null;

export function getDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL_DATABASE_URL ||
    process.env.DATABASE_URL_POSTGRES_URL ||
    process.env.DATABASE_URL_PRISMA_DATABASE_URL ||
    process.env.PRISMA_DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    "";
  return url.trim().replace(/^["']|["']$/g, "");
}

export function getPool(): Pool | null {
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) return null;
  if (!_pool) {
    _pool = new Pool({
      connectionString: dbUrl,
      ssl:
        dbUrl.includes("localhost") || dbUrl.includes("127.0.0.1")
          ? false
          : { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 5_000,
      connectionTimeoutMillis: 5_000,
    });
    _pool.on("error", (err) => {
      console.error("[DB] Unexpected pool error:", err.message);
    });
  }
  return _pool;
}

export function isPostgresEnabled(): boolean {
  return Boolean(getDatabaseUrl());
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
