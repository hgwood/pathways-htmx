import { randomBytes } from "crypto";
import Html, { type Component } from "@kitajs/html";
import { Spinner } from "./Spinner";

export const Autocomplete: Component<{
  name: string;
  lienRecherche: string;
}> = ({ name, lienRecherche, ...props }) => {
  const autocompleteId = "autcomplete" + randomBytes(16).toString("hex");
  const dataListId = autocompleteId + "DataList";
  return (
    <>
      <div
        id={autocompleteId}
        {...props}
        hx-disinherit="*"
        class="input-group autocomplete"
      >
        <span class="input-group-text">Ajouter un professeur</span>
        <span class="input-group-text">
          <i class="bi bi-search"></i>
          <Spinner />
        </span>
        <input
          name={name}
          type="text"
          list={dataListId}
          autocomplete="off"
          class="form-control"
          hx-get={lienRecherche}
          hx-trigger="input changed" // no delay here because https://github.com/bigskysoftware/htmx/issues/1189
          hx-target={`#${dataListId}`}
          hx-on-input="event.inputType === 'insertReplacementText' && htmx.trigger(this, 'change', event)"
          hx-on-change="event.target.value.match(/[0-9]+/) && htmx.trigger(this.parentElement, 'autocomplete', { value: event.target.value }) && (this.value = '')"
          hx-indicator={`#${autocompleteId}`}
          hx-sync="closest .autocomplete:abort"
        ></input>
      </div>
      <datalist id={dataListId}></datalist>
      <style>
        {`
          .autocomplete .htmx-indicator {
            display: none;
          }

          .autocomplete.htmx-request .htmx-indicator {
            display: inline;
          }

          .autocomplete.htmx-request .bi-search {
            display: none;
          }
        `}
      </style>
    </>
  );
};
