import http from "node:http";

export const get: http.RequestListener = (req, res) => {
  res.writeHead(200);
  res.end("Hello");
};
