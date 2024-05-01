import { Html, type Component } from "@kitajs/html";
import type { Professeur } from "../db/types";
import { ResultatsRechercheProfesseurs } from "./ResultatsRechercheProfesseurs";

export const CarteAjoutProfesseur: Component<{
  professeurs: Professeur[];
  lienSoumission?: string;
  recherche: string;
  lienRecherche?: string;
}> = ({ professeurs, recherche, lienRecherche = "", lienSoumission = "" }) => {
  return (
    <div id="carteAjoutProfesseur" class="card p-4">
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
            hx-get={lienRecherche}
            hx-trigger="input changed delay:200ms, search"
            hx-target="#resultatsRechercheProfesseurs"
            hx-swap="outerHTML"
            hx-replace-url="true"
            // hx-indicator=".htmx-indicator"
          />
        </div>
      </form>
      <form method="post" action={lienSoumission}>
        <ResultatsRechercheProfesseurs
          professeurs={professeurs}
          lienSoumission={lienSoumission}
        />
      </form>
    </div>
  );
};
