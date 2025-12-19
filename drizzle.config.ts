import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./packages/shared/src/drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config;
