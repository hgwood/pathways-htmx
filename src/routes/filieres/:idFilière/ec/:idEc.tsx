import { eq } from "drizzle-orm";
import { Html } from "@kitajs/html";
import { EcForm } from "../../../../components/EcForm";
import type { RouteHandler } from "../../../../utils/route";
import { html, notFound } from "../../../../utils/httpResponse";
import { $ec } from "../../../../db/schema";
import { db } from "../../../../db/db";

export const get: RouteHandler = async (req, res, { params }) => {
  if (!params?.idFilière || !params?.idEc) {
    return notFound(res);
  }
  const ec = await db().query.$ec.findFirst({
    columns: {
      numéro: true,
    },
    where: eq($ec.id, params.idEc),
    with: {
      volumesHoraire: {
        columns: {
          modalité: true,
          heures: true,
          minutes: true,
        },
      },
    },
  });
  if (!ec) {
    return notFound(res);
  }
  return html(res, <EcForm ec={ec} />);
};
