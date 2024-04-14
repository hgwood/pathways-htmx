import { relations } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  unique,
  primaryKey,
} from "drizzle-orm/sqlite-core";

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

export const $ecRelations = relations($ec, ({ one, many }) => ({
  ue: one($ue, {
    fields: [$ec.idUe],
    references: [$ue.id],
  }),
  matière: one($matières, {
    fields: [$ec.idMatière],
    references: [$matières.id],
  }),
  volumesHoraire: many($volumesHoraire),
  assignations: many($assignations),
}));

export const $matières = sqliteTable("matière", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nom: text("nom").notNull(),
});

export const $volumesHoraire = sqliteTable("volume_horaire", {
  idEc: integer("id_ec", { mode: "number" })
    .notNull()
    .references(() => $ec.id),
  modalité: text("modalité").notNull(),
  heures: integer("heures", { mode: "number" }).notNull(),
  minutes: integer("minutes", { mode: "number" }).notNull(),
});

export const $volumesHoraireRelations = relations(
  $volumesHoraire,
  ({ one }) => ({
    ec: one($ec, {
      fields: [$volumesHoraire.idEc],
      references: [$ec.id],
    }),
  })
);

export const $professeurs = sqliteTable("professeur", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nom: text("nom").notNull(),
});

export const $assignations = sqliteTable(
  "assignation",
  {
    idProfesseur: integer("id_professeur", { mode: "number" })
      .notNull()
      .references(() => $professeurs.id),
    idEc: integer("id_ec", { mode: "number" })
      .notNull()
      .references(() => $ec.id),
    modalité: text("modalité").notNull().default("Cours"),
    heures: integer("heures", { mode: "number" }).notNull().default(0),
    minutes: integer("minutes", { mode: "number" }).notNull().default(0),
  },
  (table) => ({
    pk: primaryKey(table.idProfesseur, table.idEc),
  })
);

export const $assignationsRelations = relations($assignations, ({ one }) => ({
  ec: one($ec, {
    fields: [$assignations.idEc],
    references: [$ec.id],
  }),
  professeur: one($professeurs, {
    fields: [$assignations.idProfesseur],
    references: [$professeurs.id],
  }),
}));
