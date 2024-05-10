import { Html, type Component } from "@kitajs/html";
import type { Ec, Filière, Semestre, Ue } from "../db/types";
import { Table, type Column } from "./Table";

export const CarteArbreMaquette: Component<{
  filière: Filière<{
    id: true;
    semestres: {
      numéro: true;
      idFilière: true;
      ue: {
        numéro: true;
        nom: true;
        ec: {
          numéro: true;
          matière: {
            nom: true;
          };
        };
      };
    };
  }>;
  recherche: string;
  actionRecherche?: string;
  selected?: number;
}> = ({ filière, recherche, actionRecherche, selected }) => {
  const élémentsMaquette = [];
  for (const semestre of filière.semestres) {
    élémentsMaquette.push({ ...semestre, type: "semestre" });
    for (const ue of semestre.ue) {
      élémentsMaquette.push({ ...ue, type: "ue" });
      for (const ec of ue.ec) {
        if (
          !recherche ||
          ec.matière.nom.toLowerCase().includes(recherche.toLowerCase())
        ) {
          élémentsMaquette.push({ ...ec, type: "ec" });
        }
      }
      if (élémentsMaquette.at(-1)?.type === "ue") {
        élémentsMaquette.pop();
      }
    }
    if (élémentsMaquette.at(-1)?.type === "semestre") {
      élémentsMaquette.pop();
    }
  }
  return (
    <div id="carteArbreMaquette" class="card p-4 h-100 overflow-auto">
      <form method="GET">
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-search"></i>
          </span>
          <input
            name="recherche"
            type="search"
            class="form-control"
            value={recherche}
            hx-get={actionRecherche}
            hx-trigger="input changed delay:200ms, search"
            hx-target="#arbreFilière"
            hx-swap="outerHTML transition:true"
            hx-select="#arbreFilière"
            hx-replace-url="true"
          />
        </div>
      </form>
      <Table
        id="arbreFilière"
        dataSource={élémentsMaquette}
        columns={columns}
        size="sm"
        borders="none"
        hover={true}
        shadow={false}
        includeIndicator={false}
        args={[filière, recherche]}
        active={({ type, id }) => type === "ec" && id === selected}
      />
    </div>
  );
};

const columns = [
  {
    title: "#",
    render(item) {
      let label, className;
      switch (item.type) {
        case "semestre":
          label = `S ${item.numéro}`;
          className = "text-bg-warning";
          break;
        case "ue":
          label = `UE ${item.semestre.numéro}${item.numéro}`;
          className = "text-bg-success";
          break;
        case "ec":
          label = `${item.ue.semestre.numéro}${item.ue.numéro}-${String(
            item.numéro
          ).padStart(2, "0")}`;
          className = "text-bg-info";
          break;
      }
      return (
        <span class={["badge", className]} safe>
          {label}
        </span>
      );
    },
  },
  {
    title: "Nom",
    render(item, index, items, filière, recherche) {
      let label;
      let className;
      let content;
      switch (item.type) {
        case "semestre":
          label = `Semestre ${item.numéro}`;
          className = "";
          break;
        case "ue":
          label = item.nom;
          className = "ms-4";
          break;
        case "ec":
          label = item.matière.nom;
          className = "ms-5";
          content = (
            <a
              href={`/v2/filieres/${filière.id}/ec/${item.id}?recherche=${recherche}`}
              hx-boost="true"
              hx-swap="transition:true"
              class="text-decoration-none"
              safe
            >
              {label}
            </a>
          );
          break;
      }
      const safeLabel = label;
      return <div class={className}>{content ?? safeLabel}</div>;
    },
  },
  {
    title: "Profs",
    render(item) {
      if (item.type === "ec" && item.assignations.length > 0) {
        return (
          <span style="white-space: nowrap">{item.assignations.length}</span>
        );
      }
      return <></>;
    },
  },
] satisfies Column<
  | (Semestre & { type: "semestre" })
  | (Ue & { type: "ue" })
  | (Ec & { type: "ec" }),
  [Filière, string]
>[];
