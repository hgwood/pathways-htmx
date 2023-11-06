import { eq } from "drizzle-orm";
import { Html } from "@kitajs/html";
import { db, $filières } from "../../db/db";
import type { RouteHandler } from "../../utils/route";
import { html, notFound } from "../../utils/httpResponse";
import { Page } from "../../components/Page";

export const get: RouteHandler = async (req, res, { params }) => {
  if (!params?.id) {
    return notFound(res);
  }
  const filière = await db().query.$filières.findFirst({
    columns: {
      nomInterne: true,
      nomOfficiel: true,
    },
    where: eq($filières.id, params.id),
    with: {
      ue: {
        columns: {
          nom: true,
          numéro: true,
        },
      },
    },
  });
  if (!filière) {
    return notFound(res);
  }
  return html(
    res,
    <Page>
      <h1>
        <span safe>{filière.nomInterne}</span>
        <span> </span>
        <small safe>{filière.nomOfficiel}</small>
      </h1>
      <ul>
        {filière.ue.map((ue) => (
          <li>
            UE{ue.numéro} <span safe>{ue.nom}</span>
          </li>
        ))}
      </ul>
    </Page>
  );
};
