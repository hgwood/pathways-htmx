import fs from "node:fs";
import path from "node:path";

export default function scanRouteFiles(rootDir: string) {
  return fs
    .readdirSync(rootDir, { recursive: true, encoding: "utf-8" })
    .map((routeFilePath) => {
      const route =
        "/" +
        path.join(
          path.dirname(routeFilePath),
          path.basename(routeFilePath, path.extname(routeFilePath))
        );
      return { route, module: path.join(rootDir, routeFilePath) };
    });
}
