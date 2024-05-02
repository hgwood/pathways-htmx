import { Html, type Component } from "@kitajs/html";
import type { Professeur } from "../db/types";
import { ResultatsRechercheProfesseurs } from "./ResultatsRechercheProfesseurs";
import { CloseButton } from "./CloseButton";

export const CarteAjoutProfesseur: Component<{
  professeurs: Professeur[];
  lienSoumission?: string;
  recherche: string;
  lienRecherche?: string;
  lienFermeture?: string;
}> = ({
  professeurs,
  recherche,
  lienRecherche = "",
  lienSoumission = "",
  lienFermeture = "",
}) => {
  return (
    <div id="carteAjoutProfesseur" class="card p-4">
      {lienFermeture && <CloseButton href={lienFermeture} />}
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
            autocomplete="off"
            hx-get={lienRecherche}
            hx-trigger="input changed delay:200ms, search"
            hx-target="#resultatsRechercheProfesseurs"
            hx-swap="outerHTML"
            hx-replace-url="true"
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
