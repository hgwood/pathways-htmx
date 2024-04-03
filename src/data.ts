export const filières = {
  1: {
    id: 1,
    nomInterne: "Histoire",
    nomOfficiel: "Sciences Humaines et Sociales mention Histoire",
    semestres: [
      {
        numéro: 1,
        idFilière: 1,
        id: 1,
        ue: [
          {
            nom: "Enseignements Fondamentaux",
            numéro: 1,
            id: 1,
            ec: [
              {
                id: 1,
                numéro: 1,
                matière: { nom: "Histoire de l'Orient Ancien", id: 1 },
              },
              {
                id: 2,
                numéro: 2,
                matière: { nom: "Histoire Médiévale", id: 2 },
              },
              {
                id: 3,
                numéro: 3,
                matière: { nom: "Histoire Moderne", id: 3 },
              },
              {
                id: 4,
                numéro: 4,
                matière: { nom: "Histoire Contemporaine", id: 4 },
              },
            ],
          },
          {
            nom: "Enseignements Complémentaires",
            numéro: 2,
            id: 2,
            ec: [
              {
                id: 5,
                numéro: 1,
                matière: { nom: "Géographie", id: 5 },
              },
              {
                id: 6,
                numéro: 2,
                matière: { nom: "TP Informatique", id: 6 },
              },
            ],
          },
          {
            nom: "Enseignements Transversaux",
            numéro: 3,
            id: 3,
            ec: [
              {
                id: 7,
                numéro: 1,
                matière: {
                  nom: "Grandes Problématiques de la Culture Générale Historique",
                  id: 7,
                },
              },
              {
                id: 8,
                numéro: 2,
                matière: { nom: "Méthodologie Générale", id: 8 },
              },
              {
                id: 10,
                numéro: 4,
                matière: { nom: "Allemand", id: 10 },
              },
              {
                id: 11,
                numéro: 5,
                matière: { nom: "Espagnol", id: 11 },
              },
              { id: 9, numéro: 6, matière: { nom: "Anglais", id: 9 } },
              { id: 12, numéro: 8, matière: { nom: "Latin", id: 12 } },
              { id: 13, numéro: 9, matière: { nom: "Grec", id: 13 } },
            ],
          },
          {
            nom: "Matières Facultatives (Bonus) - 1 au choix",
            numéro: 4,
            id: 4,
            ec: [
              {
                id: 18,
                numéro: 9,
                matière: { nom: "Latin Médiéval", id: 18 },
              },
              {
                id: 20,
                numéro: 10,
                matière: { nom: "Théâtre", id: 20 },
              },
              {
                id: 15,
                numéro: 14,
                matière: { nom: "Formation à l'Entrepreneuriat", id: 15 },
              },
              { id: 19, numéro: 15, matière: { nom: "Sport", id: 19 } },
              {
                id: 14,
                numéro: 16,
                matière: { nom: "Colloques Historiques", id: 14 },
              },
              {
                id: 16,
                numéro: 17,
                matière: { nom: "Langue des Signes", id: 16 },
              },
              {
                id: 21,
                numéro: 18,
                matière: { nom: "Théologie", id: 21 },
              },
              {
                id: 17,
                numéro: 19,
                matière: { nom: "Langue vivante 2", id: 17 },
              },
            ],
          },
        ],
      },
      {
        numéro: 2,
        idFilière: 1,
        id: 2,
        ue: [
          {
            nom: "Enseignements Fondamentaux",
            numéro: 1,
            id: 5,
            ec: [
              {
                id: 22,
                numéro: 1,
                matière: { nom: "Histoire Ancienne", id: 22 },
              },
              {
                id: 23,
                numéro: 2,
                matière: { nom: "Histoire Médiévale", id: 2 },
              },
              {
                id: 24,
                numéro: 3,
                matière: { nom: "Histoire Moderne", id: 3 },
              },
              {
                id: 25,
                numéro: 4,
                matière: { nom: "Histoire Contemporaine", id: 4 },
              },
            ],
          },
          {
            nom: "Enseignements Complémentaires",
            numéro: 2,
            id: 6,
            ec: [
              {
                id: 26,
                numéro: 1,
                matière: { nom: "Géographie", id: 5 },
              },
              {
                id: 27,
                numéro: 2,
                matière: { nom: "Chronologie", id: 23 },
              },
              {
                id: 28,
                numéro: 3,
                matière: {
                  nom: "Expression Orale : Introduction à l'Oral Historique",
                  id: 24,
                },
              },
              {
                id: 29,
                numéro: 17,
                matière: { nom: "Méthodologie Générale", id: 25 },
              },
            ],
          },
          {
            nom: "Enseignements Transversaux",
            numéro: 3,
            id: 7,
            ec: [
              {
                id: 30,
                numéro: 1,
                matière: {
                  nom: "Culture Générale : Rhétorique - Discours Politique",
                  id: 26,
                },
              },
              {
                id: 31,
                numéro: 2,
                matière: { nom: "Projet Professionnel Etudiant", id: 27 },
              },
              { id: 33, numéro: 4, matière: { nom: "Anglais", id: 9 } },
              {
                id: 34,
                numéro: 5,
                matière: { nom: "Allemand", id: 10 },
              },
              {
                id: 35,
                numéro: 6,
                matière: { nom: "Espagnol", id: 11 },
              },
              { id: 36, numéro: 7, matière: { nom: "Latin", id: 12 } },
              { id: 37, numéro: 8, matière: { nom: "Grec", id: 13 } },
              {
                id: 32,
                numéro: 9,
                matière: {
                  nom: "Certification Voltaire (Préparation / Orthographe et Grammaire)",
                  id: 28,
                },
              },
            ],
          },
          {
            nom: "Matières Facultatives (Bonus) - 1 au choix",
            numéro: 4,
            id: 8,
            ec: [
              {
                id: 42,
                numéro: 9,
                matière: { nom: "Latin Médiéval", id: 18 },
              },
              {
                id: 44,
                numéro: 10,
                matière: { nom: "Théâtre", id: 20 },
              },
              {
                id: 39,
                numéro: 14,
                matière: { nom: "Formation à l'Entrepreneuriat", id: 15 },
              },
              { id: 43, numéro: 15, matière: { nom: "Sport", id: 19 } },
              {
                id: 38,
                numéro: 16,
                matière: { nom: "Colloques Historiques", id: 14 },
              },
              {
                id: 40,
                numéro: 17,
                matière: { nom: "Langue des Signes", id: 16 },
              },
              {
                id: 45,
                numéro: 18,
                matière: { nom: "Théologie", id: 21 },
              },
              {
                id: 41,
                numéro: 19,
                matière: { nom: "Langue vivante 2", id: 17 },
              },
            ],
          },
        ],
      },
    ],
  },
};
