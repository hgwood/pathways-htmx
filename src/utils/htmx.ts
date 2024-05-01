import http from "node:http";

export function isHtmxRequest(req: http.IncomingMessage) {
  return req.headers["hx-request"] === "true";
}

export function htmxTriggerName(req: http.IncomingMessage) {
  return req.headers["hx-trigger-name"];
}
