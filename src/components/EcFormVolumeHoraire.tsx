import { Html } from "@kitajs/html";
import type { Assignation } from "../db/types";

export function EcFormVolumeHoraire({
  assignations,
}: {
  assignations: Assignation<{ heures: true; modalité: true }>[];
}) {
  const heuresParModalité = ["Cours", "TD", "TP"]
    .map((modalité) => {
      const heures = assignations
        .filter((assignation) => assignation.modalité === modalité)
        .reduce((sum, assignation) => sum + assignation.heures, 0);
      return { modalité, heures };
    })
    .filter(({ heures }) => heures > 0);
  return (
    <div id="volumeHoraire" class="row text-center">
      {heuresParModalité.map(({ modalité, heures }) => (
        <div class="col p-4">
          <p class="display-6">{heures}h</p>
          <p safe>{modalité}</p>
        </div>
      ))}
    </div>
  );
}
