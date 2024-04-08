import { Html } from "@kitajs/html";
import { Table, type Column } from "./Table";
import type { Ec } from "../db/types";
import { AddProfessorModal } from "./AddProfessorModal";

const typeCours = [{ label: "Cours" }, { label: "TD" }, { label: "TP" }];

export function EcForm({
  ec,
}: {
  ec: Ec<{
    id: true;
    numéro: true;
    volumesHoraire: { modalité: true; heures: true; minutes: true };
    ue: {
      semestre: {
        idFilière: true;
      };
    };
  }>;
}) {
  const typeExamen = [
    { label: "Ecrit" },
    { label: "Oral" },
    { label: "Pratique" },
  ];
  return (
    <>
      <form action="submit" method="POST">
        <fieldset class="my-3">
          <legend>Volume horaire</legend>
          <Table
            id="volume-table"
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
            dataSource={ec.volumesHoraire}
          />
        </fieldset>

        <fieldset class="my-3">
          <legend>Professeurs</legend>
          <div class="my-3">
            <ProfesseursTable />
            <a
              href={`/v2/filieres/${ec.ue.semestre.idFilière}/ec/${ec.id}/ajouterProfesseur`}
              class="btn btn-secondary btn-small"
            >
              Ajouter un professeur
            </a>
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
              id="examen-table"
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
      <AddProfessorModal />
    </>
  );
}

function ProfesseursTable() {
  return (
    <Table
      id="professeurs-table"
      columns={professeursTableColumns}
      dataSource={[
        { nom: "Mme Dupont", modalité: "TD" },
        { nom: "M. Crush", modalité: "TP" },
      ]}
    />
  );
}

export const professeursTableColumns = [
  {
    title: "Nom",
    render(item) {
      return (
        <>
          <span safe>{item.nom}</span>
          <input type="hidden" value={item.nom} />
        </>
      );
    },
  },
  {
    title: "Modalité",
    render(item) {
      return (
        <select name="professeurType" class="form-control">
          {typeCours.map(({ label }) => (
            <option selected={label === item.modalité} safe>
              {label}
            </option>
          ))}
        </select>
      );
    },
  },
] satisfies Column<{
  nom: string;
  modalité: string;
}>[];
