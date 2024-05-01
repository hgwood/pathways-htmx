import { Html, type Component } from "@kitajs/html";
import type { Filière } from "../entities";
import { ArbreMaquette } from "./ArbreMaquette";

export const CarteArbreMaquette: Component<{
  filière: Filière;
  recherche: string;
  actionRecherche?: string;
}> = ({ filière, recherche, actionRecherche }) => {
  return (
    <div id="carteArbreMaquette" class="card p-4">
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
            hx-target="#arbre-filière"
            hx-swap="outerHTML"
            hx-select="#arbre-filière"
            hx-replace-url="true"
          />
        </div>
      </form>
      <ul id="arbre-filière">
        {filière.semestres.map((semestre) => (
          <li>
            <h2>Semestre {semestre.numéro}</h2>
            <ArbreMaquette semestre={semestre} recherche={recherche} />
          </li>
        ))}
      </ul>
    </div>
  );
};
