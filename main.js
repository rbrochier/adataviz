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



