import { sql } from "drizzle-orm";
import { Html } from "@kitajs/html";
import { db, filières } from "../../db/db";
import type { RouteHandler } from "../../utils/route";
import { html, notFound } from "../../utils/httpResponse";

export const get: RouteHandler = async (req, res, { params }) => {
  if (!params?.id) {
    return notFound(res);
  }
  const [filière] = await db()
    .select()
    .from(filières)
    .where(sql`${filières.id} = ${params.id}`)
    .limit(1);
  if (!filière) {
    return notFound(res);
  }
  return html(
    res,
    <>
      <h1>
        <span safe>{filière.nomInterne}</span>
        <span> </span>
        <small safe>{filière.nomOfficiel}</small>
      </h1>
    </>
  );
};
