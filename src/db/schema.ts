import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const filières = sqliteTable("filière", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nom: text("nom").notNull(),
  nomOfficiel: text("nomOfficiel").notNull(),
});
