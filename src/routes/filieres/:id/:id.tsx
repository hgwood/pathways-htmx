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
            <form action="submit" method="POST">
              <fieldset class="my-3">
                <legend>Volume horaire</legend>
                <div class="my-3">
                  <label for="volumeHoraireCours" class="form-label">
                    Cours
                  </label>
                  <div class="input-group">
                    <input
                      name="volumeHoraireCoursHeures"
                      type="number"
                      class="form-control"
                      placeholder="Heures"
                      aria-label="Cours : heures"
                      min="0"
                    ></input>
                    <span class="input-group-text">h</span>
                    <input
                      name="volumeHoraireCoursMinutes"
                      type="number"
                      class="form-control"
                      placeholder="Minutes"
                      aria-label="Cours : minutes"
                      step="15"
                      min="0"
                      max="45"
                    ></input>
                  </div>
                </div>
                <div class="my-3">
                  <label for="volumeHoraireTd" class="form-label">
                    TD
                  </label>
                  <div class="input-group">
                    <input
                      name="volumeHoraireTdHeures"
                      type="number"
                      class="form-control"
                      placeholder="Heures"
                      aria-label="TD : heures"
                      min="0"
                    ></input>
                    <span class="input-group-text">h</span>
                    <input
                      name="volumeHoraireTdMinutes"
                      type="number"
                      class="form-control"
                      placeholder="Minutes"
                      aria-label="TD : minutes"
                      step="15"
                      min="0"
                      max="45"
                    ></input>
                  </div>
                </div>
                <div class="my-3">
                  <label for="volumeHoraireTp" class="form-label">
                    TP
                  </label>
                  <div class="input-group">
                    <input
                      name="volumeHoraireTpHeures"
                      type="number"
                      class="form-control"
                      placeholder="Heures"
                      aria-label="TP : heures"
                      min="0"
                    ></input>
                    <span class="input-group-text">h</span>
                    <input
                      name="volumeHoraireTpMinutes"
                      type="number"
                      class="form-control"
                      placeholder="Minutes"
                      aria-label="TP : minutes"
                      step="15"
                      min="0"
                      max="45"
                    ></input>
                  </div>
                </div>
              </fieldset>

              <fieldset class="my-3">
                <legend>Professeurs</legend>
                <table class="table">
                  <tbody>
                    <tr>
                      <td>
                        <select name="professeur" class="form-control">
                          <option selected>Mme Dupont</option>
                          <option>M. Crush</option>
                        </select>
                      </td>
                      <td>
                        <select name="professeurType" class="form-control">
                          <option selected>Cours</option>
                          <option>TD</option>
                          <option>TP</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select name="professeur" class="form-control">
                          <option>Mme Dupont</option>
                          <option selected>M. Crush</option>
                        </select>
                      </td>
                      <td>
                        <select name="professeurType" class="form-control">
                          <option>Cours</option>
                          <option>TD</option>
                          <option selected>TP</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>

              <fieldset class="my-3">
                <legend>Examens</legend>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Type</th>
                      <th scope="col">Coefficient</th>
                      <th scope="col">Durée</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select name="typeExamen" class="form-control">
                          <option selected>Ecrit</option>
                          <option>Oral</option>
                          <option>Pratique</option>
                        </select>
                      </td>
                      <td>
                        <input
                          name="coefficientExamen"
                          type="number"
                          min="0"
                          class="form-control"
                          value="3"
                        ></input>
                      </td>
                      <td>
                        <input
                          name="duréeExamen"
                          type="number"
                          min="0"
                          class="form-control"
                          value="2"
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select name="typeExamen" class="form-control">
                          <option>Ecrit</option>
                          <option selected>Oral</option>
                          <option>Pratique</option>
                        </select>
                      </td>
                      <td>
                        <input
                          name="coefficientExamen"
                          type="number"
                          min="0"
                          class="form-control"
                          value="1"
                        ></input>
                      </td>
                      <td>
                        <input
                          name="duréeExamen"
                          type="number"
                          min="0"
                          class="form-control"
                          value="1"
                        ></input>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>

              <fieldset class="my-3">
                <legend>ECTS</legend>
                <label for="nombreCréditEcts" class="form-label">
                  Nombre de crédits
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="nombreCréditEcts"
                  min="0"
                />
              </fieldset>
              <button type="submit" class="btn btn-primary">
                Valider
              </button>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};
