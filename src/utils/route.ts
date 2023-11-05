import http from "node:http";
import type { MatchedRoute } from "radix3";

export type RouteHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  match: MatchedRoute
) => void;
