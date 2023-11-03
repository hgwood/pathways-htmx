import * as elements from "typed-html";

export function get(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(<p>paragraph</p>);
}
