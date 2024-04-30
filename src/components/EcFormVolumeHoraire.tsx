import { Html } from "@kitajs/html";
import type { Assignation } from "../db/types";

export function EcFormVolumeHoraire({
  assignations,
}: {
  assignations: Assignation<{ heures: true; modalité: true }>[];
}) {
  if (assignations.length === 0) {
    return (
      <div id="volumeHoraire" class="alert alert-warning" role="alert">
        Aucun professeur n'est assigné à cet EC. Ajoutez un professeur
        ci-dessous.
      </div>
    );
  }
  const heuresParModalité = ["Cours", "TD", "TP"]
    .map((modalité) => {
      const heures = assignations
        .filter((assignation) => assignation.modalité === modalité)
        .reduce((sum, assignation) => sum + assignation.heures, 0);
      return { modalité, heures };
    })
    .filter(({ heures }) => heures > 0);
  const totalHeures = heuresParModalité.reduce(
    (total, { heures }) => total + heures,
    0
  );
  if (totalHeures === 0) {
    return (
      <div id="volumeHoraire" class="alert alert-warning" role="alert">
        Aucun professeur n'a d'heures assignées à cet EC. Ajustez les heures des
        professeurs ci-dessous.
      </div>
    );
  }
  const pourcentageHeuresParModalité = heuresParModalité.map(
    ({ modalité, heures }) => ({
      modalité,
      pourcentage: (heures / totalHeures) * 100,
    })
  );
  const bg: Record<string, string> = {
    Cours: "bg-success",
    TD: "bg-info",
    TP: "bg-warning",
  };
  return (
    <div id="volumeHoraire">
      <div class="row text-center">
        {heuresParModalité.map(({ modalité, heures }) => (
          <div class="col p-4">
            <p class="display-6">{heures}h</p>
            <p safe>{modalité}</p>
          </div>
        ))}
      </div>
      <div class="row">
        <div class="col">
          <div class="progress-stacked">
            {pourcentageHeuresParModalité.map(({ modalité, pourcentage }) => (
              <div
                id={`volumeHoraireProgress${modalité}`}
                class="progress"
                role="progressbar"
                aria-label={`Pourcentage ${modalité}`}
                aria-valuenow={pourcentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={`width: ${pourcentage}%`}
              >
                <div class={`progress-bar ${bg[modalité]}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
