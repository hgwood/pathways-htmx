import path from "node:path";
import url from "node:url";

export default function moduleFsSibling(moduleUrl: string, name: string) {
  return path.join(path.dirname(url.fileURLToPath(moduleUrl)), name);
}
