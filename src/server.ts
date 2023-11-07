import http from "node:http";
import path from "node:path";
import * as radix3 from "radix3";
import scanRouteFiles from "./utils/scanRouteFiles";
import composeModuleFsSiblingPath from "./utils/moduleFsSibling";
import { methodNotAllowed, notFound } from "./utils/httpResponse";
import serveHandler from "serve-handler";

const serveHandlerOptions = {
  directoryListing: false,
  public: composeModuleFsSiblingPath(import.meta.url, "assets"),
} satisfies Parameters<typeof serveHandler>[2];

const router = scanRouteFiles(
  composeModuleFsSiblingPath(import.meta.url, "routes")
).reduce((router, { module, route }) => {
  console.log(`insert route: ${route}`);
  router.insert(route, { module });
  return router;
}, radix3.createRouter());

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "", "http://example.com");
  if (url.pathname.startsWith("/assets/")) {
    req.url = path.relative("/assets", req.url!);
    return serveHandler(req, res, serveHandlerOptions);
  }
  const routeMatch = router.lookup(url.pathname);
  if (!routeMatch) {
    return notFound(res);
  }
  const routeModule = await import(routeMatch.module);
  const routeFunction = routeModule[req.method?.toLowerCase() ?? ""];
  if (!routeFunction) {
    return methodNotAllowed(res);
  }
  routeFunction(req, res, routeMatch);
});

server.listen(4500, () => {
  console.log("listening");
});
