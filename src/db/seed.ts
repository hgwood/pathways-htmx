import { getTableColumns, sql, type Table } from "drizzle-orm";
import { db, $filières, $ue } from "./db";

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
  .insert($ue)
  .values([
    {
      id: 1,
      idFilière: 1,
      numéro: 1,
      nom: "Enseignements Fondamentaux",
    },
    {
      id: 2,
      idFilière: 1,
      numéro: 2,
      nom: "Enseignements Complémentaires",
    },
    {
      id: 3,
      idFilière: 1,
      numéro: 3,
      nom: "Enseignements Transversaux",
    },
    {
      id: 4,
      idFilière: 1,
      numéro: 4,
      nom: "Matières Facultatives (Bonus) - 1 au choix",
    },
  ])
  .onConflictDoUpdate({
    target: $ue.id,
    set: allColumns($ue),
  });

function allColumns<T extends Table>(table: T) {
  return Object.fromEntries(
    Object.entries(getTableColumns(table)).map(([jsName, column]) => [
      jsName,
      sql.raw(`excluded."${column.name}"`),
    ])
  );
}
