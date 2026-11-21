import { filtrerParThematique } from "./utils";

describe("filtrerParThematique", () => {
     const projetsTest = [
      { thematique: "Mobilités" },
      { thematique: "Cadre de vie" },
      { thematique: "Mobilités" },
     
    ]
  it("garde les projets de la thematique choisie", () => {
   
    const resultat = filtrerParThematique(projetsTest, "Mobilités");

    expect(resultat.length).toBe(2);
  });

   it("renvoie un tableau vide si le projet n'existe pas", () => {
      

    const resultat = filtrerParThematique(projetsTest, "Sport");

    expect(resultat.length).toBe(0);

});

})

