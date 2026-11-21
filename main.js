import {
  formaterDonnees,
  extraireThematiques,
  filtrerParThematique,
} from "./utils.js";
/* DOM */

const listeThemes = document.getElementById("liste-themes");
const pageThematique = document.getElementById("page-thematique");
const thematiqueChoisie = document.getElementById("thematique-choisie");
const compteurProjets = document.getElementById("compteur-projets");
const detailProjet = document.getElementById("detail-projet");
const boutonNavigation = document.getElementById("bouton-navigation");
const boutonRetour = document.getElementById("bouton-retour");
const boutonSuivant = document.getElementById("bouton-suivant");
const retourMenu = document.getElementById("retour-menu");
const menuThemes = document.getElementById("menu-themes");
const formRecherche = document.getElementById("form-recherche");

/* fetch data */

const chargerDonnees = async () => {
  try {
    const reponse = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/bp_projets_gagnants/records?limit=100",
    );

    if (reponse.ok) {
      console.log("Connexion réussie !");
      const jsonReponse = await reponse.json();
      const resultats = jsonReponse.results;
      resultats.forEach((element) => {
        console.log(element);
      });
    } else {
      throw new Error("Erreur Serveur: " + reponse.status);
    }
  } catch (error) {
    console.log(error);
  }
};

chargerDonnees();




function afficherBouton(thematiques, projets) {
  thematiques.forEach((theme) => {
    const li = document.createElement("li");
    const bouton = document.createElement("button");
    bouton.textContent = theme;
    bouton.classList.add("bouton-theme");

    bouton.addEventListener("click", () => {
      projetsDuTheme = filtrerParThematique(projets, theme);
      indexCourant = 0
      titreThematique.textContent = theme
      menuThemes.classList.add("cache")          
      pageThematique.classList.remove("cache")   
      afficherProjet()
    })



    li.appendChild(bouton);
    listeThemes.appendChild(li);
  });
}



const demarrer = async () => {
  const projets = await chargerDonnees();
  const thematiques = extraireThematiques(projets);
  afficherBouton(thematiques, projets);
};
demarrer()


const afficherProjet = () => {
  
  const projet = projetsDuTheme[indexCourant]
  nomProjet.textContent = projet.titre_projet_gagnant
  arrondissement.textContent = projet.arrondissement_projet_gagnant
  avancement.textContent = projet.avancement_projet
  budget.textContent = projet.budget_global_projet_gagnant
  lienProjet.href = projet.lien_projet_gagnant
  compteur.textContent = `Projet ${indexCourant + 1}/${projetsDuTheme.length}`
}



async function init() {
  const resultats = await chargerDonnees();
  const projets = resultats.map(formaterDonnees);
  const thematiques = extraireThematiques(projets);
  afficherBouton(thematiques);
}
init();
