import * as streamConsumers from "node:stream/consumers";
import { eq } from "drizzle-orm";
import { Html } from "@kitajs/html";
import type { RouteHandler } from "../../utils/route";
import { html, notFound } from "../../utils/httpResponse";
import { SemestreTab } from "../../components/SemestreTab";

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
      {searchResults.map(({ name }) => (
        <li safe>{name}</li>
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
