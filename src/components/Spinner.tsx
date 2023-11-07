import { Html } from "@kitajs/html";
import type { Component } from "@kitajs/html";

export const Spinner: Component = () => {
  return (
    <span class="htmx-indicator">
      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span class="visually-hidden" role="status">
        Loading...
      </span>
    </span>
  );
};
