import { Html } from "@kitajs/html";
import { eq } from "drizzle-orm";
import { db, $filières } from "../../../../db/db";
import type { RouteHandler } from "../../../../utils/route";
import { html, notFound } from "../../../../utils/httpResponse";
import { Page } from "../../../../components/Page";
import { ArbreMaquette } from "../../../../components/ArbreMaquette";

export const get: RouteHandler = async (req, res, { params }) => {
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

  return html(
    res,
    <Page>
      <h1>
        <span safe>{filière.nomInterne}</span>
        <span> </span>
        <small safe>{filière.nomOfficiel}</small>
      </h1>
      <div class="container">
        <div class="row gx-4">
          <div class="col">
            <div class="card p-4">
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-search"></i>
                </span>
                <input
                  name="termeRechercheFilière"
                  type="search"
                  class="form-control"
                  hx-post={`${filière.id}/recherche`}
                  hx-trigger="input changed delay:100ms, search"
                  hx-target="#arbre-filière"
                  hx-swap="outerHTML"
                  hx-indicator=".htmx-indicator"
                />
              </div>
              <ul id="arbre-filière">
                {filière.semestres.map((semestre) => (
                  <li>
                    <h2>Semestre {semestre.numéro}</h2>
                    <ArbreMaquette semestre={semestre} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
