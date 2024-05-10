import Html, { type Component } from "@kitajs/html";
import { Spinner } from "./Spinner";

export const Autocomplete: Component<{
  id: string;
  name: string;
  lienRecherche: string;
  value?: string;
  options?: string[];
}> = ({ id, name, lienRecherche, value = "", options = [], ...props }) => {
  const autocompleteId = id;
  const inputId = autocompleteId + "Input";
  const dataListId = autocompleteId + "DataList";
  return (
    <>
      <div
        id={autocompleteId}
        {...props}
        hx-disinherit="*"
        hx-include="find input"
        class="input-group autocomplete"
      >
        <span class="input-group-text">Ajouter un professeur</span>
        <span class="input-group-text">
          <i class="bi bi-search"></i>
          <Spinner />
        </span>
        <input
          id={inputId}
          name={name}
          type="text"
          list={dataListId}
          autocomplete="off"
          class="form-control"
          value={value}
          hx-get={lienRecherche}
          hx-trigger="input changed delay:200ms"
          hx-target={`#${autocompleteId}`}
          hx-on-input="event.inputType === 'insertReplacementText' && htmx.trigger(this, 'change', event)"
          hx-on-change={`${JSON.stringify(
            options
          )}.includes(event.target.value) && htmx.trigger(this.parentElement, 'autocomplete', { value: event.target.value }) && (this.value = '')`}
          hx-indicator={`#${autocompleteId}`}
          hx-sync="closest .autocomplete:abort"
        ></input>
      </div>
      <datalist id={dataListId}>
        {options.map((option) => (
          <option value={option}></option>
        ))}
      </datalist>
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
