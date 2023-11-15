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
      nom: "Histoire de l'Orient Ancien",
    },
    {
      id: 2,
      nom: "Histoire Médiévale",
    },
    {
      id: 3,
      nom: "Histoire Moderne",
    },
    {
      id: 4,
      nom: "Histoire Contemporaine",
    },
    {
      id: 5,
      nom: "Géographie",
    },
    {
      id: 6,
      nom: "TP Informatique",
    },
    {
      id: 7,
      nom: "Grandes Problématiques de la Culture Générale Historique",
    },
    {
      id: 8,
      nom: "Méthodologie Générale",
    },
    {
      id: 9,
      nom: "Anglais",
    },
    {
      id: 10,
      nom: "Allemand",
    },
    {
      id: 11,
      nom: "Espagnol",
    },
    {
      id: 12,
      nom: "Latin",
    },
    {
      id: 13,
      nom: "Grec",
    },
    {
      id: 14,
      nom: "Colloques Historiques",
    },
    {
      id: 15,
      nom: "Formation à l'Entrepreneuriat",
    },
    {
      id: 16,
      nom: "Langue des Signes",
    },
    {
      id: 17,
      nom: "Langue vivante 2",
    },
    {
      id: 18,
      nom: "Latin Médiéval",
    },
    {
      id: 19,
      nom: "Sport",
    },
    {
      id: 20,
      nom: "Théâtre",
    },
    {
      id: 21,
      nom: "Théologie",
    },
  ])
  .onConflictDoUpdate({
    target: $matières.id,
    set: allColumns($matières),
  })
  .returning();

await db()
  .insert($ec)
  .values([
    {
      id: 1,
      idUe: 1,
      idMatière: 1,
      numéro: 1,
    },
    {
      id: 2,
      idUe: 1,
      idMatière: 2,
      numéro: 2,
    },
    {
      id: 3,
      idUe: 1,
      idMatière: 3,
      numéro: 3,
    },
    {
      id: 4,
      idUe: 1,
      idMatière: 4,
      numéro: 4,
    },
    {
      id: 5,
      idUe: 2,
      idMatière: 5,
      numéro: 1,
    },
    {
      id: 6,
      idUe: 2,
      idMatière: 6,
      numéro: 2,
    },
    {
      id: 7,
      idUe: 3,
      idMatière: 7,
      numéro: 1,
    },
    {
      id: 8,
      idUe: 3,
      idMatière: 8,
      numéro: 2,
    },
    {
      id: 9,
      idUe: 3,
      idMatière: 9,
      numéro: 6,
    },
    {
      id: 10,
      idUe: 3,
      idMatière: 10,
      numéro: 4,
    },
    {
      id: 11,
      idUe: 3,
      idMatière: 11,
      numéro: 5,
    },
    {
      id: 12,
      idUe: 3,
      idMatière: 12,
      numéro: 8,
    },
    {
      id: 13,
      idUe: 3,
      idMatière: 13,
      numéro: 9,
    },
    {
      id: 14,
      idUe: 4,
      idMatière: 14,
      numéro: 16,
    },
    {
      id: 15,
      idUe: 4,
      idMatière: 15,
      numéro: 14,
    },
    {
      id: 16,
      idUe: 4,
      idMatière: 16,
      numéro: 17,
    },
    {
      id: 17,
      idUe: 4,
      idMatière: 17,
      numéro: 19,
    },
    {
      id: 18,
      idUe: 4,
      idMatière: 18,
      numéro: 9,
    },
    {
      id: 19,
      idUe: 4,
      idMatière: 19,
      numéro: 15,
    },
    {
      id: 20,
      idUe: 4,
      idMatière: 20,
      numéro: 10,
    },
    {
      id: 21,
      idUe: 4,
      idMatière: 21,
      numéro: 18,
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
