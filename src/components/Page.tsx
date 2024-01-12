import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";

export const Page: Component<
  { title?: string } & JSX.IntrinsicElements["body"]
> = ({ title, children, ...props }) => {
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
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossorigin="anonymous"
          ></link>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/zephyr/bootstrap.min.css"
          ></link>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css"
          ></link>
          <link rel="stylesheet" href="/assets/style.css"></link>
        </head>
        <body {...props}>
          <div class="container">{children}</div>
        </body>
      </html>
    </>
  );
};
