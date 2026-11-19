
export const formaterDonnees = (element) => ({

theme : element.thematique,
titre : element.titre_projet_gagnant,
arrondissement : element.arrondissement_projet_gagnant,
avancement : element.avancement_projet,
annee : element.edition,
budget : element.budget_global_projet_gagnant,
lien : element.lien_projet_gagnant,

})

export const extraireThematiques = (projets) => {
  const thematiques = [];                    
  for (const projet of projets) {
    const theme = projet.theme;
    if (!thematiques.includes(theme)) {      
      thematiques.push(theme);               
    }
  }
  return thematiques;
};






/// function filtrerParNom(donnees, recherche)

const filtrerParNom = (donnees, recherche) => {

}

 /// function filtrerParCategorie(donnees, valeur)

 const filtrerParCategorie = (donnees, valeur) => {

 }

 /// function trierParNom(donnees)

 const trierParNom = (donnees) => {

 }