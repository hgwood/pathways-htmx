import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";
import type { Semestre } from "../db/types";

export type ArbreMaquette = {
  semestre: Semestre<{
    numéro: true;
    idFilière: true;
    ue: {
      nom: true;
      numéro: true;
      ec: { id: true; numéro: true; matière: { nom: true } };
    };
  }>;
  recherche?: string;
} & JSX.IntrinsicElements["ul"];

export const ArbreMaquette: Component<ArbreMaquette> = ({
  semestre,
  recherche,
  ...props
}) => {
  if (recherche) {
    for (const ue of semestre.ue) {
      ue.ec = ue.ec.filter((ec) =>
        ec.matière.nom.toLocaleLowerCase().includes(recherche.toLowerCase())
      );
    }
    semestre.ue = semestre.ue.filter((ue) => ue.ec.length > 0);
  }

  return (
    <ul {...props}>
      {semestre.ue.map((ue) => (
        <li>
          <h3>
            UE {semestre.numéro}
            {ue.numéro} <span safe>{ue.nom}</span>
          </h3>
          <ul>
            {ue.ec.map((ec) => (
              <li>
                <a
                  href={`/v2/filieres/${semestre.idFilière}/ec/${ec.id}?recherche=${recherche}`}
                  hx-boost="true"
                >
                  {ec.matière.nom}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
