import http from "node:http";
import { ok } from "../utils/httpResponse";

export const get: http.RequestListener = (req, res) => {
  return ok(res, "Hello");
};
