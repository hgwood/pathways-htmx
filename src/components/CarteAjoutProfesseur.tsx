import { Html, type Component } from "@kitajs/html";
import type { Professeur } from "../db/types";

export const CarteAjoutProfesseur: Component<{
  professeurs: Professeur[];
  recherche: string;
  lienSoumission?: string;
}> = ({ professeurs, recherche, lienSoumission = "" }) => {
  return (
    <div class="card p-4">
      <form method="get">
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-search"></i>
          </span>
          <input
            name="rechercheProfesseur"
            type="search"
            class="form-control"
            value={recherche}
            // hx-post={`${filière.id}/recherche`}
            // hx-trigger="input changed delay:100ms, search"
            // hx-target="#arbre-filière"
            // hx-swap="outerHTML"
            // hx-indicator=".htmx-indicator"
          />
        </div>
      </form>
      <form method="post" action={lienSoumission}>
        <ul class="list-group">
          {professeurs.map(({ id, nom }, index) => (
            <li class="list-group-item list-group-item-action">
              <input
                class="form-check-input d-none"
                type="submit"
                name="idProfesseur"
                value={String(id)}
                id={`professorSearchResult${index}`}
                // hx-post="ajoutProfesseur"
                // hx-target="#professeurs-table > tbody"
                // hx-swap="beforeend"
                // data-bs-dismiss="modal"
              />
              <label
                class="form-check-label stretched-link"
                for={`professorSearchResult${index}`}
                safe
              >
                {nom}
              </label>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};
