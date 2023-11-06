import fs from "node:fs";
import path from "node:path";

export default function scanRouteFiles(rootDir: string) {
  return fs
    .readdirSync(rootDir, {
      recursive: true,
      withFileTypes: true,
      encoding: "utf-8",
    })
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const dirName = path.basename(entry.path)
      const nameNoExt = path.basename(entry.name, path.extname(entry.name));
      const isIndex = nameNoExt === dirName;
      const relative = path.relative(rootDir, entry.path);
      const route = "/" + (isIndex ? relative : path.join(relative, nameNoExt));
      return { route, module: path.join(entry.path, entry.name) };
    });
}
