import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";

export const Page: Component<{ title?: string }> = ({ title, children }) => {
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
          <link rel="stylesheet" href="/assets/style.css" />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
};
