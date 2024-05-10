import { Html } from "@kitajs/html";
import { eq } from "drizzle-orm";
import { db, $filières } from "../../../../db/db";
import type { RouteHandler } from "../../../../utils/route";
import { html, notFound } from "../../../../utils/httpResponse";
import { Page } from "../../../../components/Page";
import { CarteArbreMaquette } from "../../../../components/CarteArbreMaquette";
import type { Filière } from "../../../../db/types";

export const get: RouteHandler = async (req, res, { params }, url) => {
  if (!params?.idFilière) {
    return notFound(res);
  }
  const filière = await fetchFilièreForArbreMaquette(Number(params.idFilière));
  if (!filière) {
    return notFound(res);
  }

  const recherche = url?.searchParams.get("recherche") ?? "";

  return html(
    res,
    <Page class="d-flex flex-column">
      <h1 class="mx-3">
        <span safe>{filière.nomInterne}</span>
        <span> </span>
        <small class="h5 text-body-secondary" safe>
          {filière.nomOfficiel}
        </small>
      </h1>
      <div class="container overflow-hidden">
        <div class="row gx-4 h-100">
          <div class="col h-100">
            <CarteArbreMaquette
              filière={filière}
              recherche={recherche}
              actionRecherche={url?.pathname}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export function fetchFilièreForArbreMaquette(idFilière: Filière["id"]) {
  return db().query.$filières.findFirst({
    columns: {
      id: true,
      nomInterne: true,
      nomOfficiel: true,
    },
    where: eq($filières.id, idFilière),
    with: {
      semestres: {
        columns: {
          numéro: true,
          idFilière: true,
        },
        with: {
          ue: {
            columns: {
              nom: true,
              numéro: true,
            },
            with: {
              semestre: {
                columns: {
                  numéro: true,
                },
              },
              ec: {
                columns: {
                  id: true,
                  numéro: true,
                },
                with: {
                  matière: {
                    columns: {
                      nom: true,
                    },
                  },
                  volumesHoraire: {
                    columns: {
                      heures: true,
                      minutes: true,
                    },
                  },
                  ue: {
                    columns: {
                      numéro: true,
                    },
                    with: {
                      semestre: {
                        columns: {
                          numéro: true,
                        },
                      },
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
}
