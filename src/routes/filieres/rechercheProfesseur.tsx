import * as streamConsumers from "node:stream/consumers";
import { eq } from "drizzle-orm";
import { Html } from "@kitajs/html";
import type { RouteHandler } from "../../utils/route";
import { html, notFound } from "../../utils/httpResponse";
import { SemestreTab } from "../../components/SemestreTab";
import classNames from "classnames";

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
        <button
          type="button"
          class={classNames("list-group-item list-group-item-action", {
            active: index === 0,
          })}
          aria-current={index === 0}
          safe
        >
          {name}
        </button>
      ))}
    </>
  );
};

const professors = [
  {
    name: "Ulric Williamson",
  },
  {
    name: "Zena Robinson",
  },
  {
    name: "Morgan Flores",
  },
  {
    name: "Amal Dodson",
  },
  {
    name: "Alexandra Nunez",
  },
];
