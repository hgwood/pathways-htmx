import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";
import type { Semestre } from "../db/schema";

export type SemestreTabProps = {
  semestre: Semestre<{ numéro: true; ue: { nom: true; numéro: true } }>;
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
        </li>
      ))}
    </ul>
  );
};
