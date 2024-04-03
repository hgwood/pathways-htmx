export interface Filière {
  nomInterne: string;
  nomOfficiel: string;
  semestres: Semestre[];
}

export interface Semestre {
  numéro: number;
}
