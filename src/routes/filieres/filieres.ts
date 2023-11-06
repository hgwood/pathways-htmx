import { db, $filières } from "../../db/db";
import { ok } from "../../utils/httpResponse";
import type { RouteHandler } from "../../utils/route";

export const get: RouteHandler = async (req, res) => {
  const filières = await db().select().from($filières);
  return ok(res, filières);
};
