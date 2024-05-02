import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";

export const Page: Component<{
  title?: string;
}> = ({ title, children: safeChildren, ...props }) => {
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
          <script src="https://unpkg.com/htmx.org@1.9.12"></script>
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
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
            crossorigin="anonymous"
          ></script>
        </head>
        <body
          hx-on-htmx-error="bootstrap.Toast.getOrCreateInstance(htmx.find('#liveToast')).show()"
          {...props}
        >
          <div class="container-fluid">{safeChildren}</div>

          <div class="toast-container position-fixed top-0 end-0 p-3">
            <div
              class="toast align-items-center text-bg-danger border-0"
              id="liveToast"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div class="d-flex">
                <div class="toast-body">
                  Une erreur inattendue est survenue.
                </div>
                <button
                  type="button"
                  class="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
        </body>
      </html>
    </>
  );
};
