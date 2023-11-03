import path from "node:path";
import url from "node:url";

export default function composeModuleFsSiblingPath(
  moduleUrl: string,
  siblingName: string
) {
  return path.join(path.dirname(url.fileURLToPath(moduleUrl)), siblingName);
}
