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
    <ul class="list-unstyled" {...props}>
      {semestre.ue.map((ue) => (
        <li>
          <h3>
            UE {semestre.numéro}
            {ue.numéro} <span safe>{ue.nom}</span>
          </h3>
          <ul>
            {ue.ec.map((ec) => (
              <li>
                <span safe class="badge bg-info">
                  {String(ec.numéro).padStart(2, "0")}
                </span>{" "}
                <span safe>{ec.matière.nom}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
