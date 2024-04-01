import * as streamConsumers from "node:stream/consumers";
import { Html } from "@kitajs/html";
import type { RouteHandler } from "../../utils/route";
import { html, notFound } from "../../utils/httpResponse";
import { TableRow } from "../../components/Table";
import { professeursTableColumns } from "../../components/EcForm";

export const post: RouteHandler = async (req, res) => {
  const form = new URLSearchParams(await streamConsumers.text(req));
  const selectedProfessorName = form.get("selectedProfessor");
  if (!selectedProfessorName) {
    return notFound(res);
  }
  return html(
    res,
    <TableRow
      item={{ nom: selectedProfessorName, modalité: "TD" }}
      columns={professeursTableColumns}
    />
  );
};
