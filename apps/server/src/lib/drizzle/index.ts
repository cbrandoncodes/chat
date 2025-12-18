import { config } from "dotenv";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { sql } from "drizzle-orm";

import * as schema from "@shared/drizzle/schema";

config({
  path: ".env",
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

// RLS
export async function withUserContext<T>(
  userId: string,
  queryFn: (db: NodePgDatabase<typeof schema>) => Promise<T>
) {
  return await db.transaction(async (tx) => {
    await tx.execute(sql`
      select set_config('app.active_user_id', ${userId}, true);
    `);

    return queryFn(tx);
  });
}
