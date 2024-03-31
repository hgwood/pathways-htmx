import { Html } from "@kitajs/html";

export function AddProfessorModal() {
  return (
    <div
      class="modal"
      tabindex="-1"
      aria-hidden="true"
      id="add-professor-modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input
              name="termeRechercheProfesseur"
              type="search"
              class="form-control"
              placeholder="Rechercher un professeur"
              hx-get="rechercheProfesseur"
              hx-target="#add-professor-modal-search-results"
              hx-trigger="input changed delay:100ms, search"
              hx-indicator=".htmx-indicator"
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="modal-body">
            <ul id="add-professor-modal-search-results"></ul>
          </div>
        </div>
      </div>
    </div>
  );
}
