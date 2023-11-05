import { eq } from "drizzle-orm";
import { db, filières } from "../../db/db";
import type { RouteHandler } from "../../utils/route";

export const get: RouteHandler = async (req, res, { params }) => {
  if (!params?.id) {
    res.writeHead(404);
    res.end();
    return;
  }
  const filière = await db().query.filières.findFirst({
    where: eq(filières.id, params.id),
  });
  if (!filière) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(filière));
};
