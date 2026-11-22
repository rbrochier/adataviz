import {
  formaterDonnees,
  extraireThematiques,
  filtrerParThematique,
  filtrerParNom,
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
const totalProjets = document.getElementById("total-projets");
const champRecherche = document.getElementById("site-search");

const nomProjet = document.querySelector(".nom-projet");
const arrondissementProjet = document.querySelector(".arrondissement");
const avancementProjet = document.querySelector(".avancement-projet");
const budgetProjet = document.querySelector(".budget");
const lienProjet = document.querySelector(".url-projet");

let projetsDuTheme = [];
let indexCourant = 0;

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
      return resultats;
    } else {
      throw new Error("Erreur Serveur: " + reponse.status);
    }
  } catch (error) {
    console.log(error);
  }
};

const activerRecherche = (projets) => {
  formRecherche.addEventListener("submit", (event) => {
    event.preventDefault();

    const texte = champRecherche.value.trim();
    const resultats = filtrerParNom(projets, texte);

    if (resultats.length === 0) {
      thematiqueChoisie.textContent = `Aucun projet pour « ${texte} »`;
      return;
    }
    if (texte === "") {
      return;
    }

    projetsDuTheme = resultats;
    indexCourant = 0;
    thematiqueChoisie.textContent = `Recherche : ${texte}`;
    menuThemes.classList.add("cache");
    pageThematique.classList.remove("cache");
    afficherProjet();
  });
};

function afficherBouton(thematiques, projets) {
  thematiques.forEach((theme) => {
    const li = document.createElement("li");
    const bouton = document.createElement("button");
    bouton.textContent = theme;
    bouton.classList.add("bouton-theme");

    bouton.addEventListener("click", () => {
      projetsDuTheme = filtrerParThematique(projets, theme);
      indexCourant = 0;
      thematiqueChoisie.textContent = theme;
      menuThemes.classList.add("cache");
      pageThematique.classList.remove("cache");
      afficherProjet();
    });

    li.appendChild(bouton);
    listeThemes.appendChild(li);
  });
}

const afficherProjet = () => {
  const projet = projetsDuTheme[indexCourant];
  nomProjet.textContent = projet.titre;
  arrondissementProjet.textContent = "Arrondissement: " + projet.arrondissement;
  avancementProjet.textContent = "Avancement: " + projet.avancement;
  budgetProjet.textContent = "Budget: " + projet.budget + " €";
  lienProjet.href = projet.lien;
  compteurProjets.textContent = `Projet ${indexCourant + 1}/${projetsDuTheme.length}`;
};

boutonSuivant.addEventListener("click", () => {
  if (indexCourant != projetsDuTheme.length - 1) {
    indexCourant = indexCourant + 1;
    afficherProjet();
  }
});

boutonRetour.addEventListener("click", () => {
  if (indexCourant != 0) indexCourant = indexCourant - 1;
  afficherProjet();
});

retourMenu.addEventListener("click", () => {
  menuThemes.classList.remove("cache");
  pageThematique.classList.add("cache");
});

async function init() {
  const resultats =  await chargerDonnees();
  const projets = resultats.map(formaterDonnees);
  totalProjets.textContent = `${projets.length} projets lauréats`;
  const thematiques = extraireThematiques(projets);
  afficherBouton(thematiques, projets);
  activerRecherche(projets);
}
init();
