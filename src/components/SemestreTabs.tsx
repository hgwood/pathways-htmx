import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";
import cn from "classnames";
import type { Semestre } from "../db/schema";
import { SemestreTab, type SemestreTabProps } from "./SemestreTab";

export const SemestreTabs: Component<{
  semestres: Semestre<{ idFilière: true; numéro: true }>[];
  active: Semestre<{ idFilière: true; numéro: true }> &
    SemestreTabProps["semestre"];
}> = ({ semestres, active }) => {
  return (
    <div id="semester-tabs">
      <ul class="nav nav-underline">
        {semestres.map((semestre) => (
          <li class="nav-item">
            <a
              class={cn("nav-link", { active: semestre === active })}
              aria-current="page"
              href="#"
              hx-get={`${semestre.idFilière}/semestres/${semestre.numéro}`}
              hx-target="#semester-tabs"
            >
              Semestre {semestre.numéro}
            </a>
          </li>
        ))}
      </ul>
      <SemestreTab semestre={active} />
    </div>
  );
};
