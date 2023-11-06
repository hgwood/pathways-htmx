import http from "node:http";
import { db, filières } from "../../db/db";
import { ok } from "../../utils/httpResponse";

export const get: http.RequestListener = async (req, res) => {
  const allFilières = await db().select().from(filières);
  return ok(res, allFilières);
};
