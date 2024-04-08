import http from "node:http";
import etag from "etag";

export const ok: HttpResponseWriter<[unknown]> = (res, body) => {
  return statusCode(res, 200, {}, body);
};

export const html: HttpResponseWriter<[unknown, HttpHeaders?]> = (
  res,
  body,
  headers = {}
) => {
  return statusCode(
    res,
    200,
    { "content-type": "text/html", ...headers },
    body
  );
};

export const redirect: HttpResponseWriter<[string]> = (res, location) => {
  return statusCode(res, 302, { location });
};

export const notFound: HttpResponseWriter = (res) => {
  return statusCode(res, 404);
};

export const methodNotAllowed: HttpResponseWriter = (res) => {
  return statusCode(res, 405);
};

export const statusCode: HttpResponseWriter<
  [StatusCode, HttpHeaders?, unknown?]
> = (res, statusCode, headers = {}, body) => {
  if (!body) {
    res.writeHead(statusCode, headers);
    return res.end();
  } else if (typeof body === "string") {
    headers["etag"] ??= etag(body);
    if (headers["etag"] === res.req.headers["if-none-match"]) {
      res.writeHead(304);
      return res.end();
    }
    headers["content-type"] ??= "text/plain";
    res.writeHead(statusCode, headers);
    return res.end(body, "utf-8");
  } else {
    const stringBody = JSON.stringify(body);
    headers["etag"] ??= etag(stringBody);
    if (headers["etag"] === res.req.headers["if-none-match"]) {
      res.writeHead(304);
      return res.end();
    }
    headers["content-type"] ??= "application/json";
    res.writeHead(statusCode, headers);
    return res.end(stringBody, "utf-8");
  }
};

type HttpResponseWriter<TArgs extends unknown[] = []> = (
  res: NodejsHttpServerResponse,
  ...args: TArgs
) => void;

type StatusCode = number;

type HttpHeaders = Record<string, string>;

type NodejsHttpServerResponse = Parameters<http.RequestListener>[1];
