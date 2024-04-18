import { Html } from "@kitajs/html";
import { and, eq } from "drizzle-orm";
import * as streamConsumers from "node:stream/consumers";

import { db, $filières, $ec, $assignations } from "../../../../../../db/db";
import type { RouteHandler } from "../../../../../../utils/route";
import { html, notFound, redirect } from "../../../../../../utils/httpResponse";
import { Page } from "../../../../../../components/Page";
import { EcForm } from "../../../../../../components/EcForm2";
import { CarteArbreMaquette } from "../../../../../../components/CarteArbreMaquette";
import { EcFormVolumeHoraire } from "../../../../../../components/EcFormVolumeHoraire";

export const get: RouteHandler = async (req, res, { params }, url) => {
  if (!params?.idFilière) {
    return notFound(res);
  }
  if (!params?.idEc) {
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

  const ec = await fetchEcForForm(params?.idEc);
  if (!ec) {
    return notFound(res);
  }

  const recherche = url?.searchParams.get("recherche") ?? "";

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
          <div class="col">
            <div class="card p-4">
              <EcForm ec={ec} />
            </div>
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
  const idEc = Number(params?.idEc);
  const form = new URLSearchParams(await streamConsumers.text(req));
  for (const [index, idProfesseur] of form
    .getAll("idProfesseur")
    .map(Number)
    .entries()) {
    const modalité = form.getAll("modalité")[index] ?? "";
    const heures = Number(form.getAll("nombreHeures")[index]);
    await db()
      .update($assignations)
      .set({ heures, modalité })
      .where(
        and(
          eq($assignations.idEc, idEc),
          eq($assignations.idProfesseur, idProfesseur)
        )
      );
  }
  const assignations = await db()
    .select()
    .from($assignations)
    .where(eq($assignations.idEc, idEc));
  // return redirect(res, `/v2/filieres/${params.idFilière}/ec/${params.idEc}`, {
  //   "HX-Redirect": "true",
  // });
  return html(res, <EcFormVolumeHoraire assignations={assignations} />);
};

export function fetchEcForForm(id: number) {
  return db().query.$ec.findFirst({
    columns: {
      id: true,
      numéro: true,
      idMatière: true,
      idUe: true,
    },
    where: eq($ec.id, id),
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
      assignations: {
        with: {
          professeur: {},
          ec: {
            with: {
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
          },
        },
      },
    },
  });
}
