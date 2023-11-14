import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";
import type { Semestre } from "../db/types";

export type SemestreTabProps = {
  semestre: Semestre<{
    numéro: true;
    ue: {
      nom: true;
      numéro: true;
      ec: { numéro: true; matière: { nom: true } };
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
          UE {semestre.numéro}
          {ue.numéro} <span safe>{ue.nom}</span>
          <ul>
            {ue.ec.map((ec) => (
              <li>
                {ec.numéro} <span safe>{ec.matière.nom}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
