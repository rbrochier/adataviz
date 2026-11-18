import { formaterDonnee } from "./utils.js"

const listeThemes = document.getElementById("liste-themes")
const pageThematique = document.getElementById("page-thematique")
const thematiqueChoisie = document.getElementById("thematique-choisie")
const compteurProjets = document.getElementById("compteur-projets")
const detailProjet = document.getElementById("detail-projet")
const boutonNavigation = document.getElementById("bouton-navigation")
const boutonRetour = document.getElementById("bouton-retour")
const boutonSuivant = document.getElementById("bouton-suivant")
const retourMenu = document.getElementById("retour-menu")
const menuThemes = document.getElementById("menu-themes");      
const formRecherche = document.getElementById("form-recherche");






async function getData() {
  const url =
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/bp_projets_gagnants/records?limit=20";

  try {
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error(`Response status: ${reponse.status}`);
    }

    const result = await reponse.json();
    return result ;
  } catch (error) {
    console.error(error.message);
  }
}

getData();

async function init() {
  const data = await getData();
  console.log(data.results);   
}

init();
















