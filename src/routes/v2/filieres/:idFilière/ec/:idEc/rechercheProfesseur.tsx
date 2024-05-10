import { Html } from "@kitajs/html";
import { and, eq, isNull, like } from "drizzle-orm";
import * as streamConsumers from "node:stream/consumers";
import { db, $assignations, $professeurs } from "../../../../../../db/db";
import type { RouteHandler } from "../../../../../../utils/route";
import { html, notFound, redirect } from "../../../../../../utils/httpResponse";
import { fetchEcForForm } from "./:idEc";
import { Autocomplete } from "../../../../../../components/Autocomplete";

export const get: RouteHandler = async (req, res, { params }, url) => {
  if (!params?.idFilière) {
    return notFound(res);
  }
  if (!params?.idEc) {
    return notFound(res);
  }
  const ec = await fetchEcForForm(params?.idEc);
  if (!ec) {
    return notFound(res);
  }

  const rechercheProfesseur =
    url?.searchParams.get("rechercheProfesseur") ?? "";

  const professeurs = !rechercheProfesseur
    ? []
    : await db()
        .select({
          id: $professeurs.id,
          nom: $professeurs.nom,
        })
        .from($professeurs)
        .leftJoin(
          $assignations,
          eq($professeurs.id, $assignations.idProfesseur)
        )
        .where(
          and(
            like($professeurs.nom, `%${rechercheProfesseur}%`),
            isNull($assignations.idProfesseur)
          )
        );

  return html(
    res,
    <Autocomplete
      id="rechercheProfesseur"
      name="rechercheProfesseur"
      hx-post={`/v2/filieres/${params.idFilière}/ec/${params.idEc}/ajouterProfesseur`}
      hx-trigger="autocomplete"
      hx-target="#ecForm"
      hx-select="#ecForm"
      lienRecherche={`/v2/filieres/${params.idFilière}/ec/${params.idEc}/rechercheProfesseur`}
      value={rechercheProfesseur}
      options={professeurs.map(({ nom }) => nom)}
    />
  );
};

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
  await db().insert($assignations).values({ idProfesseur, idEc: params.idEc });
  return redirect(res, `/v2/filieres/${params.idFilière}/ec/${params.idEc}`);
};
