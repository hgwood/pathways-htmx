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
} & JSX.IntrinsicElements["ul"];

export const ArbreMaquette: Component<ArbreMaquette> = ({
  semestre,
  ...props
}) => {
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
                <a href={`${semestre.idFilière}/ec/${ec.id}`}>
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
