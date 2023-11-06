import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const filières = sqliteTable("filière", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nomInterne: text("nom_interne").notNull(),
  nomOfficiel: text("nom_officiel").notNull(),
});

export const ue = sqliteTable("ue", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  idFilière: integer("id_filière", { mode: "number" })
    .notNull()
    .references(() => filières.id),
  numéro: integer("number", { mode: "number" }).notNull(),
  nom: text("nom").notNull(),
});
