import { ok } from "../utils/httpResponse";
import type { RouteHandler } from "../utils/route";

export const get: RouteHandler = (req, res) => {
  return ok(res, "Hello");
};
