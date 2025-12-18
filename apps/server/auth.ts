import { config } from "dotenv";

import { auth } from "./src/lib/auth";

config({ path: ".env" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw Error(`DATABASE_URL was not defined: ${databaseUrl}`);
}

export { auth };
