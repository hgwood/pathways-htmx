import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";
import type { Semestre } from "../db/types";

export type SemestreTabProps = {
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

export const SemestreTab: Component<SemestreTabProps> = ({
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
                <a
                  href="#"
                  hx-get={`${semestre.idFilière}/ec/${ec.id}`}
                  hx-target="#ecForm"
                  safe
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
