import { relations } from "drizzle-orm";
import { text, integer, sqliteTable, unique } from "drizzle-orm/sqlite-core";

export const $filières = sqliteTable("filière", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nomInterne: text("nom_interne").notNull(),
  nomOfficiel: text("nom_officiel").notNull(),
});

export const $filièresRelations = relations($filières, ({ many }) => ({
  semestres: many($semestres),
}));

export const $semestres = sqliteTable(
  "semestre",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    idFilière: integer("id_filière", { mode: "number" })
      .notNull()
      .references(() => $filières.id),
    numéro: integer("numéro", { mode: "number" }).notNull(),
  },
  (table) => ({
    uniqueNuméroByFilière: unique().on(table.idFilière, table.numéro),
  })
);

export const $semestresRelations = relations($semestres, ({ one, many }) => ({
  filière: one($filières, {
    fields: [$semestres.idFilière],
    references: [$filières.id],
  }),
  ue: many($ue),
}));

export type Semestre = typeof $semestres.$inferSelect;

export const $ue = sqliteTable(
  "ue",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    idSemestre: integer("id_semestre", { mode: "number" })
      .notNull()
      .references(() => $semestres.id),
    numéro: integer("numéro", { mode: "number" }).notNull(),
    nom: text("nom").notNull(),
  },
  (table) => ({
    uniqueNuméroBySemestre: unique().on(table.idSemestre, table.numéro),
  })
);

export const $ueRelations = relations($ue, ({ one }) => ({
  semestre: one($semestres, {
    fields: [$ue.idSemestre],
    references: [$semestres.id],
  }),
}));

export type UE = typeof $ue.$inferSelect;
