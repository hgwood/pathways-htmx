import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";
import type { Semestre, UE } from "../db/schema";

export const SemestreTab: Component<
  {
    semestre: Pick<Semestre, "numéro"> & { ue: Pick<UE, "nom" | "numéro">[] };
  } & JSX.IntrinsicElements["ul"]
> = ({ semestre, ...props }) => {
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
