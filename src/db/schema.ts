import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import drizzleConfig from "../../drizzle.config";

export function db() {
  const sqlite = new Database(drizzleConfig.dbCredentials.url);
  const db = drizzle(sqlite);
  return db;
}

export const filières = sqliteTable("filière", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nom: text("nom").notNull(),
  nomOfficiel: text("nomOfficiel").notNull(),
});
