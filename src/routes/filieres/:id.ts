import { eq, sql } from "drizzle-orm";
import { db, filières } from "../../db/db";
import type { RouteHandler } from "../../utils/route";

export const get: RouteHandler = async (req, res, { params }) => {
  if (!params?.id) {
    res.writeHead(404);
    res.end();
    return;
  }
  const [filière] = await db()
    .select()
    .from(filières)
    .where(sql`${filières.id} = ${params.id}`)
    .limit(1);
  if (!filière) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(filière));
};
