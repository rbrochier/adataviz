import { filtrerParThematique } from "./utils";

describe("filtrerParThematique", () => {
  it("garde les projets de la thematique choisie", () => {
       const projetsTest = [
      { thematique: "Mobilités" },
      { thematique: "Cadre de vie" },
      { thematique: "Mobilités" },
     
    ]

    const resultat = filtrerParThematique(projetsTest, "Mobilités");

    expect(resultat.length).toBe(2);


  });

});
