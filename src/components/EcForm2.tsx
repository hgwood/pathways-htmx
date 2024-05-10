import { Html } from "@kitajs/html";
import { Table, type Column } from "./Table";
import type { Assignation, Ec } from "../db/types";
import { EcFormVolumeHoraire } from "./EcFormVolumeHoraire";
import { Autocomplete } from "./Autocomplete";

const typeCours = [{ label: "Cours" }, { label: "TD" }, { label: "TP" }];

export function EcForm({
  ec,
}: {
  ec: Ec<{
    id: true;
    numéro: true;
    volumesHoraire: { modalité: true; heures: true };
    matière: {
      nom: true;
    };
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
  const typeExamen = [
    { label: "Ecrit" },
    { label: "Oral" },
    { label: "Pratique" },
  ];
  return (
    <div id="ecForm">
      <h2 class="text-truncate">{ec.matière.nom}</h2>

      <fieldset class="my-3">
        <legend>Volume horaire</legend>
        <EcFormVolumeHoraire assignations={ec.assignations} />
      </fieldset>

      <fieldset class="my-3">
        <legend>Professeurs</legend>
        <form id="ecFormAssignations" class="my-3">
          <ProfesseursTable assignations={ec.assignations} />
        </form>
        <Autocomplete
          id="rechercheProfesseur"
          name="rechercheProfesseur"
          hx-post={`/v2/filieres/${ec.ue.semestre.idFilière}/ec/${ec.id}/ajouterProfesseur`}
          hx-trigger="autocomplete changed"
          hx-target="#ecForm"
          hx-select="#ecForm"
          lienRecherche={`/v2/filieres/${ec.ue.semestre.idFilière}/ec/${ec.id}/rechercheProfesseur`}
        />
      </fieldset>
    </div>
  );
}

function ProfesseursTable({ assignations }: { assignations: Assignation[] }) {
  return (
    <Table
      id="professeursTable"
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
          hx-target="#volumeHoraire"
          hx-swap="outerHTML"
          hx-trigger="input"
          hx-indicator="closest table"
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
        <input
          name="nombreHeures"
          type="number"
          min="1"
          required
          value={String(heures)}
          class="form-control"
          hx-post={`/v2/filieres/${ec.ue.semestre.idFilière}/ec/${ec.id}`}
          hx-target="#volumeHoraire"
          hx-swap="outerHTML"
          hx-trigger="input changed delay:200ms"
          hx-indicator="closest table"
          hx-on-input="this.reportValidity()"
        />
      );
    },
  },
  {
    render({ ec, idProfesseur }) {
      return (
        <>
          <button
            type="button"
            class="btn btn-sm"
            hx-post={`/v2/filieres/${ec.ue.semestre.idFilière}/ec/${ec.id}/supprimerProfesseur`}
            hx-vals={JSON.stringify({
              idProfesseur,
            })}
            hx-params="not modalité, nombreHeures"
            hx-target="#ecForm"
            hx-swap="outerHTML"
            hx-indicator="closest table"
            hx-disabled-elt="this"
          >
            <i class="bi bi-trash3"></i>
          </button>
          <button
            type="button"
            class="btn btn-sm"
            hx-post={`/v2/filieres/${ec.ue.semestre.idFilière}/ec/${ec.id}/envoyerEmailAuProfesseur`}
            hx-vals={JSON.stringify({
              idProfesseur,
            })}
            hx-params="not modalité, nombreHeures"
            hx-swap="none"
            hx-indicator="closest table"
            hx-disabled-elt="this"
          >
            <i class="bi bi-envelope-arrow-up"></i>
          </button>
        </>
      );
    },
  },
] satisfies Column<Assignation>[];
