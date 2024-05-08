import { randomBytes } from "crypto";
import Html, { type Component } from "@kitajs/html";

export const Autocomplete: Component<{
  name: string;
  lienRecherche: string;
}> = ({ name, lienRecherche, ...props }) => {
  const dataListId = "autocompleteDataList" + randomBytes(16).toString("hex");
  return (
    <div {...props} hx-disinherit="*">
      <input
        name={name}
        type="text"
        list={dataListId}
        autocomplete="off"
        class="form-control"
        hx-get={lienRecherche}
        hx-trigger="input changed" // no delay here because https://github.com/bigskysoftware/htmx/issues/1189
        hx-target={`#${dataListId}`}
        hx-on-input="event.inputType === 'insertReplacementText' && event.data.match(/[0-9]+/) && htmx.trigger(this.parentElement, 'change', { value: event.data }) && (this.value = '')"
      ></input>
      <datalist id={dataListId}></datalist>
    </div>
  );
};
