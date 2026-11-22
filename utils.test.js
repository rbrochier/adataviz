import { filtrerParThematique, formaterDonnees } from "./utils.js";

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
    it ("renvoie une carte avec les champs renommés", () => {
      const projetBrut = {
      titre_projet_gagnant: "Piétonnisation de la rue Saint-Jean",
      thematique: "Mobilités",
    }
    const resultat = formaterDonnees(projetBrut)
    
    expect(resultat.titre).toBe("Piétonnisation de la rue Saint-Jean")
    expect(resultat.theme).toBe("Mobilités")
})

    
})