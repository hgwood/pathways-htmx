import type { $ec, $matières, $semestres, $ue } from "./schema";

export type Semestre<KS extends KeySelect<Ue> | AllFields = AllFields> =
  Selectable<
    typeof $semestres.$inferSelect & {
      ue: Ue[];
    },
    KS
  >;

export type Ue<KS extends KeySelect<Ue> | AllFields = AllFields> = Selectable<
  typeof $ue.$inferSelect & {
    semestre: Semestre;
    ec: Ec[];
  },
  KS
>;

export type Ec<KS extends KeySelect<Ec> | AllFields = AllFields> = Selectable<
  typeof $ec.$inferSelect & {
    ue: Ue;
    matière: Matière;
  },
  KS
>;

export type Matière<KS extends KeySelect<Ec> | AllFields = AllFields> =
  Selectable<typeof $matières.$inferSelect, KS>;

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
