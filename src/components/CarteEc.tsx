import { Html, type Component } from "@kitajs/html";
import { CloseButton } from "./CloseButton";
import { EcForm } from "./EcForm2";

export const CarteEc: Component<{
  ec: unknown;
  lienFermeture?: string;
}> = ({ ec, lienFermeture = "" }) => {
  return (
    <div class="card p-4">
      <CloseButton href={lienFermeture} />
      <EcForm ec={ec} />
    </div>
  );
};
