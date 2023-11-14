import { getTableColumns, sql, type Table } from "drizzle-orm";
import { db, $filières, $ue, $semestres, $ec, $matières } from "./db";

await db()
  .insert($filières)
  .values({
    id: 1,
    nomInterne: "Histoire",
    nomOfficiel: "Sciences Humaines et Sociales mention Histoire",
  })
  .onConflictDoUpdate({
    target: $filières.id,
    set: allColumns($filières),
  });

await db()
  .insert($semestres)
  .values([
    { id: 1, idFilière: 1, numéro: 1 },
    { id: 2, idFilière: 1, numéro: 2 },
  ])
  .onConflictDoUpdate({ target: $semestres.id, set: allColumns($semestres) });

await db()
  .insert($ue)
  .values([
    {
      id: 1,
      idSemestre: 1,
      numéro: 1,
      nom: "Enseignements Fondamentaux",
    },
    {
      id: 2,
      idSemestre: 1,
      numéro: 2,
      nom: "Enseignements Complémentaires",
    },
    {
      id: 3,
      idSemestre: 1,
      numéro: 3,
      nom: "Enseignements Transversaux",
    },
    {
      id: 4,
      idSemestre: 1,
      numéro: 4,
      nom: "Matières Facultatives (Bonus) - 1 au choix",
    },
    {
      id: 5,
      idSemestre: 2,
      numéro: 1,
      nom: "Enseignements Fondamentaux",
    },
    {
      id: 6,
      idSemestre: 2,
      numéro: 2,
      nom: "Enseignements Complémentaires",
    },
    {
      id: 7,
      idSemestre: 2,
      numéro: 3,
      nom: "Enseignements Transversaux",
    },
    {
      id: 8,
      idSemestre: 2,
      numéro: 4,
      nom: "Matières Facultatives (Bonus) - 1 au choix",
    },
  ])
  .onConflictDoUpdate({
    target: $ue.id,
    set: allColumns($ue),
  });

await db()
  .insert($matières)
  .values([
    {
      id: 1,
      nom: "Français",
    },
  ])
  .onConflictDoUpdate({
    target: $matières.id,
    set: allColumns($matières),
  });

await db()
  .insert($ec)
  .values([
    {
      id: 1,
      idUe: 1,
      idMatière: 1,
      numéro: 1,
    },
  ])
  .onConflictDoUpdate({
    target: $ec.id,
    set: allColumns($ec),
  });

function allColumns<T extends Table>(table: T) {
  return Object.fromEntries(
    Object.entries(getTableColumns(table)).map(([jsName, column]) => [
      jsName,
      sql.raw(`excluded."${column.name}"`),
    ])
  );
}
