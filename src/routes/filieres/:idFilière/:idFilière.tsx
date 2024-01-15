import { eq } from "drizzle-orm";
import { Html } from "@kitajs/html";
import { db, $filières } from "../../../db/db";
import type { RouteHandler } from "../../../utils/route";
import { html, notFound } from "../../../utils/httpResponse";
import { Page } from "../../../components/Page";
import { SemestreTab } from "../../../components/SemestreTab";
import { EcForm } from "../../../components/EcForm";

export const get: RouteHandler = async (req, res, { params }) => {
  if (!params?.idFilière) {
    return notFound(res);
  }
  const filière = await db().query.$filières.findFirst({
    columns: {
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
    <Page class="bg-primary-subtle">
      <h1>
        <span safe>{filière.nomInterne}</span>
        <span> </span>
        <small safe>{filière.nomOfficiel}</small>
      </h1>
      <div class="container">
        <div class="row gx-4">
          <div class="col">
            <div class="card p-4">
              <ul>
                {filière.semestres.map((semestre) => (
                  <li>
                    <h2>Semestre {semestre.numéro}</h2>
                    <SemestreTab semestre={semestre} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="col">
            <div class="card p-4" id="ecForm"></div>
          </div>
        </div>
      </div>
    </Page>
  );
};
