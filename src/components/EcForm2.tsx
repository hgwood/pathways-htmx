import { Html } from "@kitajs/html";
import { Table, type Column } from "./Table";
import type { Assignation, Ec } from "../db/types";

const typeCours = [{ label: "Cours" }, { label: "TD" }, { label: "TP" }];

export function EcForm({
  ec,
}: {
  ec: Ec<{
    id: true;
    numéro: true;
    volumesHoraire: { modalité: true; heures: true };
    assignations: {
      modalité: true;
      professeur: { id: true; nom: true };
      heures: true;
      minutes: true;
      idEc: true;
      idProfesseur: true;
      ec: {
        ue: {
          semestre: {
            idFilière: true;
          };
        };
      };
    };
    ue: {
      semestre: {
        idFilière: true;
      };
    };
  }>;
}) {
  const heuresParModalité = ["Cours", "TD", "TP"]
    .map((modalité) => {
      const heures = ec.assignations
        .filter((assignation) => assignation.modalité === modalité)
        .reduce((sum, assignation) => sum + assignation.heures, 0);
      return { modalité, heures };
    })
    .filter(({ heures }) => heures > 0);
  const typeExamen = [
    { label: "Ecrit" },
    { label: "Oral" },
    { label: "Pratique" },
  ];
  return (
    <div id="ecForm">
      <fieldset class="my-3">
        <legend>Volume horaire</legend>
        <div class="row text-center">
          {heuresParModalité.map(({ modalité, heures }) => (
            <div class="col p-4">
              <p class="display-6">{heures}h</p>
              <p safe>{modalité}</p>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset class="my-3">
        <legend>Professeurs</legend>
        <form class="my-3">
          <ProfesseursTable assignations={ec.assignations} />
          <a
            href={`/v2/filieres/${ec.ue.semestre.idFilière}/ec/${ec.id}/ajouterProfesseur`}
            class="btn btn-secondary btn-small"
          >
            Ajouter un professeur
          </a>
        </form>
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
    </div>
  );
}

function ProfesseursTable({ assignations }: { assignations: Assignation[] }) {
  return (
    <Table
      id="professeurs-table"
      columns={professeursTableColumns}
      dataSource={assignations}
    />
  );
}

export const professeursTableColumns = [
  {
    title: "Nom",
    render({ professeur }) {
      return (
        <>
          <span safe>{professeur.nom}</span>
          <input
            name="idProfesseur"
            type="hidden"
            value={String(professeur.id)}
          />
        </>
      );
    },
  },
  {
    title: "Modalité",
    render({ modalité, ec }) {
      return (
        <select
          name="modalité"
          class="form-control"
          hx-post={`/v2/filieres/${ec.ue.semestre.idFilière}/ec/${ec.id}`}
          hx-target="body"
        >
          {typeCours.map(({ label }) => (
            <option selected={label === modalité} safe>
              {label}
            </option>
          ))}
        </select>
      );
    },
  },
  {
    title: "Nombre d'heures",
    render({ heures, ec }) {
      return (
        <>
          <div class="input-group">
            <input
              name="nombreHeures"
              type="number"
              value={String(heures)}
              class="form-control"
              hx-post={`/v2/filieres/${ec.ue.semestre.idFilière}/ec/${ec.id}`}
              hx-target="body"
            />
            <span class="input-group-text">h</span>
          </div>
        </>
      );
    },
  },
] satisfies Column<Assignation>[];
