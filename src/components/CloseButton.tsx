import { Html, type Component } from "@kitajs/html";

export const CloseButton: Component<{
  href: string;
}> = ({ href }) => {
  return (
    <a
      href={href}
      class="btn-close position-absolute top-0 end-0"
      aria-label="Close"
      hx-boost="true"
      hx-swap="transition:true"
    ></a>
  );
};
