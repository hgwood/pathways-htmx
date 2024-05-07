import { Html } from "@kitajs/html";
import { like } from "drizzle-orm";
import * as streamConsumers from "node:stream/consumers";
import { db, $assignations, $professeurs } from "../../../../../../db/db";
import type { RouteHandler } from "../../../../../../utils/route";
import { html, notFound, redirect } from "../../../../../../utils/httpResponse";
import { Page } from "../../../../../../components/Page";
import { CarteArbreMaquette } from "../../../../../../components/CarteArbreMaquette";
import { CarteAjoutProfesseur } from "../../../../../../components/CarteAjoutProfesseur";
import { fetchEcForForm } from "./:idEc";
import { htmxTriggerName } from "../../../../../../utils/htmx";
import { ResultatsRechercheProfesseurs } from "../../../../../../components/ResultatsRechercheProfesseurs";
import { CarteEc } from "../../../../../../components/CarteEc";

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
    : await db().query.$professeurs.findMany({
        where: like($professeurs.nom, `%${rechercheProfesseur}%`),
      });

  return html(
    res,
    <>
      {professeurs.map(({ nom, id }) => (
        <option value={String(id)} label={nom}></option>
      ))}
    </>
  );

  if (htmxTriggerName(req) === "rechercheProfesseur") {
    return html(
      res,
      <ResultatsRechercheProfesseurs
        professeurs={professeurs}
        lienSoumission={`/v2/filieres/${params.idFilière}/ec/${params.idEc}/ajouterProfesseur`}
      />
    );
  }

  return html(
    res,
    <Page>
      <h1>
        <span safe>{filière.nomInterne}</span>
        <span> </span>
        <small safe>{filière.nomOfficiel}</small>
      </h1>
      <div class="container-fluid">
        <div class="row gx-4">
          <div class="col">
            <CarteArbreMaquette
              filière={filière}
              recherche={recherche}
              actionRecherche={url?.pathname}
            />
          </div>
          <div class="col overflow-x-hidden">
            <CarteEc
              ec={ec}
              lienFermeture={`/v2/filieres/${params.idFilière}`}
            />
          </div>
          <div class="col">
            <CarteAjoutProfesseur
              professeurs={professeurs}
              recherche={rechercheProfesseur}
              lienRecherche={`/v2/filieres/${params.idFilière}/ec/${params.idEc}/ajouterProfesseur`}
              lienFermeture={`/v2/filieres/${params.idFilière}/ec/${params.idEc}`}
            />
          </div>
        </div>
      </div>
    </Page>
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
