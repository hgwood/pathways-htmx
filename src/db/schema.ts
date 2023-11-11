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

export type Filière = typeof $filières.$inferSelect;

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

export type Semestre<KS extends KeySelect<Ue> | AllFields = AllFields> =
  Selectable<
    typeof $semestres.$inferSelect & {
      ue: Ue[];
    },
    KS
  >;

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

export type Ue<KS extends KeySelect<Ue> | AllFields = AllFields> = Selectable<
  typeof $ue.$inferSelect & {
    semestre: Semestre;
  },
  KS
>;

type Selectable<
  T extends object,
  KS extends KeySelect<T> | AllFields
> = KS extends AllFields ? T : KS extends KeySelect<T> ? Select<T, KS> : never;

type AllFields = "*";

type KeySelect<T extends object> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends object[]
      ? KeySelect<T[K][number]>
      : KeySelect<T[K]>
    : boolean;
};

type Select<T extends object, KS extends KeySelect<T>> = {
  [K in keyof T as KS[K] extends true | object ? K : never]: T[K] extends object
    ? KS[K] extends object
      ? T[K] extends object[]
        ? Select<T[K][number], KS[K]>[]
        : Select<T[K], KS[K]>
      : T[K]
    : T[K];
};
