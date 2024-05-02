import { Html, type Component } from "@kitajs/html";
import type { Professeur } from "../db/types";

export const ResultatsRechercheProfesseurs: Component<{
  professeurs: Professeur[];
  lienSoumission?: string;
}> = ({ professeurs, lienSoumission = "" }) => {
  return (
    <ul id="resultatsRechercheProfesseurs" class="list-group">
      {professeurs.map(({ id, nom }, index) => (
        <li class="list-group-item list-group-item-action">
          <input
            class="form-check-input d-none"
            type="submit"
            name="idProfesseur"
            value={String(id)}
            id={`professorSearchResult${index}`}
            hx-post={lienSoumission}
            hx-target="body"
            hx-replace-url="true"
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
  );
};
