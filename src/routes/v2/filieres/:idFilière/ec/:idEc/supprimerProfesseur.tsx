import { Html } from "@kitajs/html";
import * as streamConsumers from "node:stream/consumers";
import { db } from "../../../../../../db/db";
import { $assignations } from "../../../../../../db/schema";
import { html, notFound } from "../../../../../../utils/httpResponse";
import type { RouteHandler } from "../../../../../../utils/route";
import { and, eq } from "drizzle-orm";
import { fetchEcForForm } from "./:idEc";
import { EcForm } from "../../../../../../components/EcForm2";

export const post: RouteHandler = async (req, res, { params }) => {
  if (!params?.idFilière) {
    return notFound(res);
  }
  if (!params?.idEc) {
    return notFound(res);
  }
  const form = new URLSearchParams(await streamConsumers.text(req));
  const idProfesseur = Number(form.get("idProfesseur"));
  if (Number.isNaN(idProfesseur)) {
    // FIXME: return bad request
    return notFound(res);
  }
  await db()
    .delete($assignations)
    .where(
      and(
        eq($assignations.idEc, params.idEc),
        eq($assignations.idProfesseur, idProfesseur)
      )
    );
  // return redirect(res, `/v2/filieres/${params.idFilière}/ec/${params.idEc}`);
  const ec = await fetchEcForForm(params.idEc);
  return html(res, <EcForm ec={ec} />);
};
