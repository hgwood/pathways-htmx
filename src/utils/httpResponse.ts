import http from "node:http";

export const ok: HttpResponseWriter<[unknown]> = (res, body) => {
  return statusCode(res, 200, {}, body);
};

export const html: HttpResponseWriter<[unknown]> = (res, body) => {
  return statusCode(res, 200, { "content-type": "text/html" }, body);
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
    headers["content-type"] ??= "text/plain";
    res.writeHead(statusCode, headers);
    return res.end(body);
  } else {
    headers["content-type"] ??= "application/json";
    res.writeHead(statusCode, headers);
    return res.end(JSON.stringify(body));
  }
};

type HttpResponseWriter<TArgs extends any[] = []> = (
  res: NodejsHttpServerResponse,
  ...args: TArgs
) => void;

type StatusCode = number;

type HttpHeaders = Record<string, string>;

type NodejsHttpServerResponse = Parameters<http.RequestListener>[1];
