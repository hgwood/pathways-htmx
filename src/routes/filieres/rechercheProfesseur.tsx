import { Html } from "@kitajs/html";
import type { RouteHandler } from "../../utils/route";
import { html } from "../../utils/httpResponse";

export const get: RouteHandler = async (req, res, match, url) => {
  const termeRecherche = url?.searchParams.get("termeRechercheProfesseur");
  const searchResults = termeRecherche
    ? professors.filter(({ name }) =>
        name.toLowerCase().includes(termeRecherche?.toLowerCase())
      )
    : [];
  return html(
    res,
    <>
      {searchResults.map(({ name }, index) => (
        <li class="list-group-item list-group-item-action">
          <input
            class="form-check-input d-none"
            type="radio"
            name="selectedProfessor"
            value={name}
            id={`professorSearchResult${index}`}
            hx-post="ajoutProfesseur"
            hx-target="#professeurs-table > tbody"
            hx-swap="beforeend"
            data-bs-dismiss="modal"
          />
          <label
            class="form-check-label stretched-link"
            for={`professorSearchResult${index}`}
            safe
          >
            {name}
          </label>
        </li>
      ))}
    </>
  );
};

export const professors = [
  { firstName: "Pierre", lastName: "Dupont" },
  { firstName: "Juliette", lastName: "Lefevre" },
  { firstName: "Arnaud", lastName: "Mercier" },
  { firstName: "Marie", lastName: "Laurence" },
  { firstName: "Lucien", lastName: "Bouchard" },
  { firstName: "Gabrielle", lastName: "Tardif" },
  { firstName: "Olivier", lastName: "Renault" },
  { firstName: "Yvette", lastName: "Poirier" },
  { firstName: "Édouard", lastName: "Dubois" },
  { firstName: "Camille", lastName: "Durand" },
  { firstName: "Bernard", lastName: "Blanchard" },
  { firstName: "Vivienne", lastName: "Moreau" },
  { firstName: "Frédéric", lastName: "Charpentier" },
  { firstName: "Yannick", lastName: "Gagnon" },
  { firstName: "Sylvie", lastName: "Lemoine" },
  { firstName: "Gérard", lastName: "Beauchamp" },
  { firstName: "Céline", lastName: "Rousseau" },
  { firstName: "Louis-Philippe", lastName: "Gauthier" },
  { firstName: "Florence", lastName: "Guerin" },
  { firstName: "Maximilien", lastName: "Faure" },
  { firstName: "Isabelle", lastName: "Lacroix" },
  { firstName: "Étienne", lastName: "Fontaine" },
  { firstName: "Margot", lastName: "Leclerc" },
  { firstName: "Alphonse", lastName: "Bélanger" },
  { firstName: "Amandine", lastName: "Delorme" },
  { firstName: "Jean-François", lastName: "Pelletier" },
  { firstName: "Mathilde", lastName: "Roy" },
  { firstName: "Théophile", lastName: "Dufresne" },
  { firstName: "Delphine", lastName: "Perrault" },
  { firstName: "Romain", lastName: "Thibault" },
  { firstName: "Elodie", lastName: "Giroux" },
  { firstName: "Tristan", lastName: "Chevalier" },
  { firstName: "Valérie", lastName: "Dupuis" },
  { firstName: "Augustin", lastName: "Lafontaine" },
  { firstName: "Rosalie", lastName: "Tremblay" },
  { firstName: "Hiroshi", lastName: "Tanaka" },
  { firstName: "Sofia", lastName: "Rodriguez" },
  { firstName: "Liam", lastName: "O'Sullivan" },
  { firstName: "Rajeev", lastName: "Gupta" },
  { firstName: "Yulia", lastName: "Ivanova" },
  { firstName: "Chen", lastName: "Wei" },
  { firstName: "Abdullah", lastName: "Al-Rashid" },
  { firstName: "Lucia", lastName: "De La Cruz" },
  { firstName: "Dimitri", lastName: "Petrov" },
  { firstName: "Isabella", lastName: "Rossi" },
  { firstName: "Jackson", lastName: "Smith" },
  { firstName: "Akiko", lastName: "Yamamoto" },
  { firstName: "Juan Carlos", lastName: "Mendoza" },
  { firstName: "Olga", lastName: "Kuznetsova" },
  { firstName: "Kwame", lastName: "Nkrumah" },
].map((professeur) => ({
  ...professeur,
  name: `${professeur.firstName} ${professeur.lastName.toUpperCase()}`,
}));
