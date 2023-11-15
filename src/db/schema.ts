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

export const $ueRelations = relations($ue, ({ one, many }) => ({
  semestre: one($semestres, {
    fields: [$ue.idSemestre],
    references: [$semestres.id],
  }),
  ec: many($ec),
}));

export const $ec = sqliteTable(
  "ec",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    idUe: integer("id_ue", { mode: "number" })
      .notNull()
      .references(() => $ue.id),
    idMatière: integer("id_matière", { mode: "number" })
      .notNull()
      .references(() => $matières.id),
    numéro: integer("numéro", { mode: "number" }).notNull(),
  },
  (table) => ({
    uniqueNuméroByUe: unique().on(table.idUe, table.numéro),
  })
);

export const $ecRelations = relations($ec, ({ one }) => ({
  ue: one($ue, {
    fields: [$ec.idUe],
    references: [$ue.id],
  }),
  matière: one($matières, {
    fields: [$ec.idMatière],
    references: [$matières.id],
  }),
}));

export const $matières = sqliteTable("matières", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nom: text("nom").notNull(),
});
