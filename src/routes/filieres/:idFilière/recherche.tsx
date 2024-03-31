import * as streamConsumers from "node:stream/consumers";
import { eq } from "drizzle-orm";
import { Html } from "@kitajs/html";
import { db, $filières } from "../../../db/db";
import type { RouteHandler } from "../../../utils/route";
import { html, notFound } from "../../../utils/httpResponse";
import { SemestreTab } from "../../../components/SemestreTab";

export const post: RouteHandler = async (req, res, { params }) => {
  const form = new URLSearchParams(await streamConsumers.text(req));
  const termeRecherche = form.get("termeRechercheFilière");

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
                // where: ilike($matières.nom, `%${termeRecherche}%`),
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

  if (termeRecherche) {
    for (const semestre of filière.semestres) {
      for (const ue of semestre.ue) {
        ue.ec = ue.ec.filter((ec) =>
          ec.matière.nom
            .toLocaleLowerCase()
            .includes(termeRecherche.toLowerCase())
        );
      }
      semestre.ue = semestre.ue.filter((ue) => ue.ec.length > 0);
    }
    filière.semestres = filière.semestres.filter(
      (semestre) => semestre.ue.length > 0
    );
  }

  if (filière.semestres.length > 0) {
    return html(
      res,
      <ul id="arbre-filière">
        {filière.semestres.map((semestre) => (
          <li>
            <h2>Semestre {semestre.numéro}</h2>
            <SemestreTab semestre={semestre} />
          </li>
        ))}
      </ul>
    );
  } else {
    return html(res, <p>Aucun résultat</p>);
  }
};
