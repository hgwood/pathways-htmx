import { getTableColumns, sql, type Table } from "drizzle-orm";
import { db, filières } from "./schema";

await db()
  .insert(filières)
  .values({
    id: 1,
    nom: "Histoire",
    nomOfficiel: "Sciences Humaines et Sociales mention Histoire",
  })
  .onConflictDoUpdate({
    target: filières.id,
    set: allColumns(filières),
  });

function allColumns<T extends Table>(table: T) {
  return Object.fromEntries(
    Object.keys(getTableColumns(table)).map((name) => [
      name,
      sql.raw(`excluded."${name}"`),
    ])
  );
}
