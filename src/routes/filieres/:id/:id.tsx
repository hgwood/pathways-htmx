import { eq } from "drizzle-orm";
import { Html } from "@kitajs/html";
import { db, $filières } from "../../../db/db";
import type { RouteHandler } from "../../../utils/route";
import { html, notFound } from "../../../utils/httpResponse";
import { Page } from "../../../components/Page";
import { SemestreTab } from "../../../components/SemestreTab";

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
  return html(
    res,
    <Page>
      <h1>
        <span safe>{filière.nomInterne}</span>
        <span> </span>
        <small safe>{filière.nomOfficiel}</small>
      </h1>
      <div class="container">
        <div class="row row-cols-2">
          <div class="col">
            <ul>
              {filière.semestres.map((semestre) => (
                <li>
                  <h2>Semestre {semestre.numéro}</h2>
                  <SemestreTab semestre={semestre} />
                </li>
              ))}
            </ul>
          </div>
          <div class="col">
            <div class="container text-center">
              <div class="row row-cols-3 card-group">
                <div class="w-100">
                  <h3>Topologie</h3>
                </div>
                <div class="col d-flex flex-column card">
                  <h4>Cours</h4>
                  <i class="fs-1 bi-alarm"></i>
                  <div>3h</div>
                  <ul>
                    <li>M. Tartanpion</li>
                    <li>Mme Trucmuche</li>
                  </ul>
                </div>
                <div class="col d-flex flex-column card">
                  <h4>TD</h4>
                  <i class="fs-1 bi bi-award"></i>
                  <div>3h</div>
                  <ul>
                    <li>Mme Dupont</li>
                  </ul>
                </div>
                <div class="col d-flex flex-column card">
                  <h4>TP</h4>
                  <i class="fs-1 bi bi-pci-card"></i>
                  <div>3h</div>
                </div>
              </div>
              <div class="row row-cols-1 g-5">
                <div class="col">
                  <h3>ECTS</h3>
                  <div class="fs-1">4</div>
                </div>
              </div>
              <div class="row row-cols-3">
                <h3 class="col w-100">Examens</h3>
                <div class="col card">
                  <div class="card-body">
                    <h4>Ecrit</h4>
                    <i class="fs-1 bi bi-award"></i>
                    <div>3h</div>
                    <div>Coefficient 3</div>
                  </div>
                </div>
                <div class="col">
                  <div class="card pt-2">
                    <i class=" card-img-top fs-1 bi bi-award"></i>
                    <div class="card-body">
                      <h5 class="card-title">Oral</h5>
                      <p class="card-text">
                        <div>1h</div>
                        <div>Coefficient 1</div>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col d-flex flex-column card">
                  <h4>Oral</h4>
                  <i class="fs-1 bi bi-award"></i>
                  <div>1h</div>
                  <div>Coefficient 1</div>
                </div>
                <div class="col d-flex flex-column card">
                  <h4>Pratique</h4>
                  <i class="fs-1 bi bi-award"></i>
                  <div>5h</div>
                  <div>Coefficient 4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
