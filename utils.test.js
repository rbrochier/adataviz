import {
  extraireThematiques,
  filtrerParNom,
  filtrerParThematique,
  formaterDonnees,
} from "./utils.js";

describe("extraireThematique", () => {
  const projetsTest1 = [
    { theme: "Mobilités" },
    { theme: "Cadre de vie" },
    { theme: "Mobilités" },
  ];

  const projetsTest2 = [
    { theme: "Mobilités" },
    { theme: "Mobilités" },
    { theme: "Mobilités" },
  ];

  const projetsTest3 = [];

  it("retires les doublons", () => {
    const resultat = extraireThematiques(projetsTest1);

    expect(resultat.length).toBe(2);
  });
  it("retourne 1 seul thème", () => {
    const resultat = extraireThematiques(projetsTest2);

    expect(resultat.length).toBe(1);
  });
  it("retourne une liste vide si il n'y a aucun projet", () => {
    const resultat = extraireThematiques(projetsTest3);

    expect(resultat.length).toBe(0);
  });
});

/// function filtrerParCategorie(donnees, valeur)

describe("filtrerParThematique", () => {
  const projetsTest = [
    { theme: "Mobilités" },
    { theme: "Cadre de vie" },
    { theme: "Mobilités" },
  ];
  it("garde les projets de la thematique choisie", () => {
    const resultat = filtrerParThematique(projetsTest, "Mobilités");

    expect(resultat.length).toBe(2);
  });

  it("renvoie un tableau vide si le projet n'existe pas", () => {
    const resultat = filtrerParThematique(projetsTest, "Sport");

    expect(resultat.length).toBe(0);
  });
});

describe("formaterDonnées", () => {
  it("renvoie une carte avec les champs renommés", () => {
    const projetBrut = {
      titre_projet_gagnant: "Piétonnisation de la rue Saint-Jean",
      thematique: "Mobilités",
    };
    const resultat = formaterDonnees(projetBrut);

    expect(resultat.titre).toBe("Piétonnisation de la rue Saint-Jean");
    expect(resultat.theme).toBe("Mobilités");
  });
});

/// function filtrerParNom(donnees, recherche)

describe("filtrerParNom", () => {
  const projetsTest = [
    { titre: "Piétonnisation de la rue Saint-Jean" },
    { titre: "Jardin partagé" },
    { titre: "Piste cyclable" },
  ];

  it("garde les projets dont le titre contient le mot", () => {
    const resultat = filtrerParNom(projetsTest, "rue");

    expect(resultat).toEqual([
      { titre: "Piétonnisation de la rue Saint-Jean" },
    ]);
  });

  it("garde les projets dont le titre contient le mot , peu importe la casse", () => {
    const resultat = filtrerParNom(projetsTest, "JARDIN");

    expect(resultat).toEqual([{ titre: "Jardin partagé" }]);
  });
});
