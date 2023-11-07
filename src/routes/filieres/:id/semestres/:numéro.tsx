import { Html } from "@kitajs/html";
import { SemestreTabs } from "../../../../components/SemestreTabs";
import { html, notFound } from "../../../../utils/httpResponse";
import type { RouteHandler } from "../../../../utils/route";
import { $semestres, db } from "../../../../db/db";
import { eq } from "drizzle-orm";

export const get: RouteHandler = async (req, res, { params }) => {
  if (!params?.id || !params?.numéro) {
    return notFound(res);
  }
  const semestres = await db().query.$semestres.findMany({
    where: eq($semestres.idFilière, params.id),
    columns: {
      numéro: true,
      idFilière: true,
    },
    with: {
      ue: {
        columns: {
          nom: true,
          numéro: true,
        },
      },
    },
  });
  const active = semestres.find(
    ({ numéro }) => String(numéro) === params.numéro
  );
  if (!active) {
    return notFound(res);
  }
  return html(res, <SemestreTabs semestres={semestres} active={active} />);
};
