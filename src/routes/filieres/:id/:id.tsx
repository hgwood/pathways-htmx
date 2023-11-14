import { eq } from "drizzle-orm";
import { Html } from "@kitajs/html";
import { db, $filières } from "../../../db/db";
import type { RouteHandler } from "../../../utils/route";
import { html, notFound } from "../../../utils/httpResponse";
import { Page } from "../../../components/Page";
import { SemestreTabs } from "../../../components/SemestreTabs";

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
              ec: {
                columns: {
                  numéro: true,
                },
                with: {
                  matière: {
                    columns: {
                      nom: true,
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
  const firstSemestre = filière.semestres[0];
  return html(
    res,
    <Page>
      <h1>
        <span safe>{filière.nomInterne}</span>
        <span> </span>
        <small safe>{filière.nomOfficiel}</small>
      </h1>
      <div class="card">
        <div class="card-body">
          {firstSemestre ? (
            ((
              <SemestreTabs
                semestres={filière.semestres}
                active={firstSemestre}
              />
            ) as "safe")
          ) : (
            <span>Aucun semestre</span>
          )}
        </div>
      </div>
    </Page>
  );
};
