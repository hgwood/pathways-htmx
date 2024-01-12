import { eq } from "drizzle-orm";
import { Html } from "@kitajs/html";
import { db, $filières } from "../../../db/db";
import type { RouteHandler } from "../../../utils/route";
import { html, notFound } from "../../../utils/httpResponse";
import { Page } from "../../../components/Page";
import { SemestreTab } from "../../../components/SemestreTab";
import { Table } from "../../../components/Table";

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
  const professeurs = [{ nom: "Mme Dupont" }, { nom: "M. Crush" }];
  const typeCours = [{ label: "Cours" }, { label: "TD" }, { label: "TP" }];
  const typeExamen = [
    { label: "Ecrit" },
    { label: "Oral" },
    { label: "Pratique" },
  ];
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
            <div class="card p-4">
              <form action="submit" method="POST">
                <fieldset class="my-3">
                  <legend>Volume horaire</legend>
                  <Table
                    columns={[
                      {
                        title: "Modalité",
                        render({ modalité }) {
                          return modalité;
                        },
                      },
                      {
                        title: "Volume",
                        render({ heures, minutes }) {
                          return (
                            <div class="input-group">
                              <input
                                name="volumeHoraireCoursHeures"
                                type="number"
                                class="form-control"
                                placeholder="Heures"
                                aria-label="Cours : heures"
                                min="0"
                                value={heures.toString()}
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
                                value={minutes.toString()}
                              ></input>
                            </div>
                          );
                        },
                      },
                    ]}
                    dataSource={[
                      { modalité: "Cours", heures: 22, minutes: 0 },
                      { modalité: "TD", heures: 0, minutes: 0 },
                      { modalité: "TP", heures: 6, minutes: 30 },
                    ]}
                  />
                </fieldset>

                <fieldset class="my-3">
                  <legend>Professeurs</legend>
                  <div class="my-3">
                    <Table
                      columns={[
                        {
                          title: "Nom",
                          render(item) {
                            return (
                              <select name="professeur" class="form-control">
                                {professeurs.map(({ nom }) => (
                                  <option selected={nom === item.nom} safe>
                                    {nom}
                                  </option>
                                ))}
                              </select>
                            );
                          },
                        },
                        {
                          title: "Modalité",
                          render(item) {
                            return (
                              <select
                                name="professeurType"
                                class="form-control"
                              >
                                {typeCours.map(({ label }) => (
                                  <option
                                    selected={label === item.modalité}
                                    safe
                                  >
                                    {label}
                                  </option>
                                ))}
                              </select>
                            );
                          },
                        },
                      ]}
                      dataSource={[
                        { nom: "Mme Dupont", modalité: "TD" },
                        { nom: "M. Crush", modalité: "TP" },
                      ]}
                    />
                    <button type="button" class="btn btn-secondary btn-small">
                      Ajouter un professeur
                    </button>
                  </div>
                </fieldset>

                <fieldset class="my-3">
                  <legend>Examens</legend>

                  <div class="form-check form-switch my-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="bonus"
                    />
                    <label class="form-check-label" for="bonus">
                      Bonus
                    </label>
                  </div>

                  <div class="my-3">
                    <Table
                      columns={[
                        {
                          title: "Type",
                          render(item) {
                            return (
                              <select name="typeExamen" class="form-control">
                                {typeExamen.map(({ label }) => (
                                  <option selected={label === item.type} safe>
                                    {label}
                                  </option>
                                ))}
                              </select>
                            );
                          },
                        },
                        {
                          title: "Coefficient",
                          render(item) {
                            return (
                              <input
                                name="coefficientExamen"
                                type="number"
                                min="0"
                                class="form-control"
                                value={item.coefficient.toString()}
                              />
                            );
                          },
                        },
                        {
                          title: "Durée",
                          render(item) {
                            return (
                              <input
                                name="duréeExamen"
                                type="number"
                                min="0"
                                class="form-control"
                                value={item.durée.toString()}
                              />
                            );
                          },
                        },
                        { title: "" },
                      ]}
                      dataSource={[
                        { type: "Ecrit", coefficient: 3, durée: 2 },
                        { type: "Oral", coefficient: 2, durée: 1 },
                      ]}
                    />
                    <button type="button" class="btn btn-secondary btn-small">
                      Ajouter un examen
                    </button>
                  </div>

                  <label for="nombreCréditEcts" class="form-label">
                    Nombre de crédits ECTS
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
      </div>
    </Page>
  );
};
