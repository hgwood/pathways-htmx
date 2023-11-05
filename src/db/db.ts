import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import drizzleConfig from "../../drizzle.config";
import memo from "../utils/memo";
import * as schema from "./schema";

export const db = memo(() => {
  const sqlite = new Database(drizzleConfig.dbCredentials.url);
  const db = drizzle(sqlite, { schema });
  return db;
});

export * from "./schema";
