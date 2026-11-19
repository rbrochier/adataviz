import { formaterDonnees, extraireThematiques } from "./utils.js";
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
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/bp_projets_gagnants/records?limit=20",
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
const resultats = await chargerDonnees
const projets = resultats.map(formaterDonnees);
const thematiques = extraireThematiques (projets);


thematiques.forEach((theme) => {
  const li = document.createElement("li");
  const bouton = document.createElement("button");
  bouton.textContent = theme;
  bouton.classList.add("bouton-theme");
  li.appendChild(bouton);
  listeThemes.appendChild(li);
});

