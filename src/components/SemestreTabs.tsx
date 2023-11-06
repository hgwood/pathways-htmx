import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";
import type { Semestre } from "../db/schema";
import { SemestreTab } from "./SemestreTab";

type Props<TComponent> = TComponent extends Component<infer TProps>
  ? TProps
  : never;

export const SemestreTabs: Component<{
  semestres: Pick<Semestre, "numéro" | "idFilière">[];
  active: Props<typeof SemestreTab>["semestre"];
}> = ({ semestres, active }) => {
  return (
    <div id="semester-tabs">
      <ul>
        {semestres.map((semestre) => (
          <li>
            <button
              hx-get={`${semestre.idFilière}/semestres/${semestre.numéro}`}
              hx-target="#semester-tabs"
            >
              Semestre {semestre.numéro}
            </button>
          </li>
        ))}
      </ul>
      <SemestreTab semestre={active} />
    </div>
  );
};
