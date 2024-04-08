import { Html } from "@kitajs/html";
import { eq } from "drizzle-orm";
import { db, $filières, $ec } from "../../../../../../db/db";
import type { RouteHandler } from "../../../../../../utils/route";
import { html, notFound, redirect } from "../../../../../../utils/httpResponse";
import { Page } from "../../../../../../components/Page";
import { EcForm } from "../../../../../../components/EcForm2";
// import { CarteArbreMaquette } from "../../../../../../components/CarteArbreMaquette";
import { CarteAjoutProfesseur } from "../../../../../../components/CarteAjoutProfesseur";

export const get: RouteHandler = async (req, res, { params }, url) => {
  if (!params?.idFilière) {
    return notFound(res);
  }
  const filière = await db().query.$filières.findFirst({
    columns: {
      id: true,
      nomInterne: true,
      nomOfficiel: true,
    },
    where: eq($filières.id, params.idFilière),
    with: {
      semestres: {
        columns: {
          numéro: true,
          idFilière: true,
          id: true,
        },
        with: {
          ue: {
            columns: {
              nom: true,
              numéro: true,
              id: true,
            },
            with: {
              ec: {
                columns: {
                  id: true,
                  numéro: true,
                },
                with: {
                  matière: {
                    columns: {
                      nom: true,
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  if (!filière) {
    return notFound(res);
  }

  if (!params?.idEc) {
    return notFound(res);
  }
  const ec = await db().query.$ec.findFirst({
    columns: {
      id: true,
      numéro: true,
      idMatière: true,
      idUe: true,
    },
    where: eq($ec.id, params.idEc),
    with: {
      volumesHoraire: {
        columns: {
          heures: true,
          minutes: true,
          modalité: true,
          idEc: true,
        },
      },
      ue: {
        with: {
          semestre: {
            columns: {
              idFilière: true,
            },
          },
        },
      },
    },
  });
  if (!ec) {
    return notFound(res);
  }

  // const recherche = url?.searchParams.get("recherche") ?? "";
  const rechercheProfesseur =
    url?.searchParams.get("rechercheProfesseur") ?? "";

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
          {/* <div class="col">
            <CarteArbreMaquette filière={filière} recherche={recherche} />
          </div> */}
          <div class="col">
            <div class="card p-4">
              <EcForm ec={ec} />
            </div>
          </div>
          <div class="col">
            <CarteAjoutProfesseur recherche={rechercheProfesseur} />
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
  return redirect(res, `/v2/filieres/${params.idFilière}/ec/${params.idEc}`);
};
