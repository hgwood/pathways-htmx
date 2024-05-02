import type { RouteHandler } from "../../../../../../utils/route";
import { notFound, ok, statusCode } from "../../../../../../utils/httpResponse";
import { setTimeout } from "timers/promises";

export const post: RouteHandler = async (req, res, { params }) => {
  if (!params?.idFilière) {
    return notFound(res);
  }
  if (!params?.idEc) {
    return notFound(res);
  }
  await setTimeout(3000);
  if (Math.random() > 0) {
    return statusCode(res, 500);
  }
  return ok(res);
};
