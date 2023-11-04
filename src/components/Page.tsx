import { Html } from "@kitajs/html";
import type { PropsWithChildren } from "@kitajs/html";

export function Page({
  title,
  children,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title safe>{title || "Hello World!"}</title>
          <script src="https://unpkg.com/htmx.org@1.9.6"></script>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
