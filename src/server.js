const path = require("node:path");
const http = require("node:http");
const { default: fsRoutes } = require("fs-routes");
const radix3 = require("radix3");

const router = fsRoutes(path.join(__dirname, "routes"), {
  glob: "**/*.{js,tsx}",
  indexFileRegExp: /(?:index)?\.(js|tsx)$/,
}).reduce((router, { path, route }) => {
  router.insert(route, path);
  console.log({ route, path });
  return router;
}, radix3.createRouter());

const server = http.createServer(async (req, res) => {
  const routeMatch = router.lookup(req.url);
  if (!routeMatch) {
    res.writeHead(404);
    res.end();
    return;
  }
  const routeModule = await import(routeMatch);
  const routeFunction = routeModule[req.method?.toLowerCase()];
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
