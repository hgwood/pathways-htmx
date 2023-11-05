import http from "node:http";
import { db, filières } from "../../db/db";

export const get: http.RequestListener = async (req, res) => {
  const allFilières = await db().select().from(filières);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(allFilières));
};
