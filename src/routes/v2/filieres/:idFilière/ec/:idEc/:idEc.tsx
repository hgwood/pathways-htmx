import { Html } from "@kitajs/html";
import { and, eq } from "drizzle-orm";
import * as streamConsumers from "node:stream/consumers";

import { db, $ec, $assignations } from "../../../../../../db/db";
import type { RouteHandler } from "../../../../../../utils/route";
import { html, notFound } from "../../../../../../utils/httpResponse";
import { Page } from "../../../../../../components/Page";
import { CarteArbreMaquette } from "../../../../../../components/CarteArbreMaquette";
import { EcFormVolumeHoraire } from "../../../../../../components/EcFormVolumeHoraire";
import { CarteEc } from "../../../../../../components/CarteEc";
import { fetchFilièreForArbreMaquette } from "../../:idFilière";

export const get: RouteHandler = async (req, res, { params }, url) => {
  if (!params?.idFilière) {
    return notFound(res);
  }
  if (!params?.idEc) {
    return notFound(res);
  }
  const filière = await fetchFilièreForArbreMaquette(params.idFilière);
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
    <Page class="d-flex flex-column">
      <h1 class="mx-3">
        <span safe>{filière.nomInterne}</span>
        <span> </span>
        <small class="h5 text-body-secondary" safe>
          {filière.nomOfficiel}
        </small>
      </h1>
      <div class="container-fluid overflow-hidden">
        <div class="row gx-4 h-100">
          <div class="col h-100">
            <CarteArbreMaquette
              filière={filière}
              recherche={recherche}
              actionRecherche={url?.pathname}
            />
          </div>
          <div class="col h-100">
            <CarteEc
              ec={ec}
              lienFermeture={`/v2/filieres/${params.idFilière}`}
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
      matière: {
        columns: {
          nom: true,
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
