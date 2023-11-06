import http from "node:http";
import * as radix3 from "radix3";
import scanRouteFiles from "./utils/scanRouteFiles";
import composeModuleFsSiblingPath from "./utils/moduleFsSibling";
import { methodNotAllowed, notFound } from "./utils/httpResponse";

const router = scanRouteFiles(
  composeModuleFsSiblingPath(import.meta.url, "routes")
).reduce((router, { module, route }) => {
  console.log(`insert route: ${route}`);
  router.insert(route, { module });
  return router;
}, radix3.createRouter());

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "", "http://example.com");
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
