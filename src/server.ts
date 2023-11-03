import http from "node:http";
import { createRouter } from "radix3";
import scanRouteFiles from "./scanRouteFiles";
import moduleFsSibling from "./utils/moduleFsSibling";

const router = scanRouteFiles(
  moduleFsSibling(import.meta.url, "routes")
).reduce((router, { module, route }) => {
  router.insert(route, { module });
  return router;
}, createRouter());

const server = http.createServer(async (req, res) => {
  const routeMatch = router.lookup(req.url ?? "");
  if (!routeMatch) {
    res.writeHead(404);
    res.end();
    return;
  }
  const routeModule = await import(routeMatch.module);
  const routeFunction = routeModule[req.method?.toLowerCase() ?? ""];
  if (!routeFunction) {
    res.writeHead(405);
    res.end();
    return;
  }
  routeFunction(req, res);
});

server.listen(4500, () => {
  console.log("listening", Object.keys(router.ctx.staticRoutesMap));
});
