const URL = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
const cardContainer = document.querySelector(".card-container");
let pokeData = [];

async function fetchData(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            pokeData = data.results;
            pokeCards();
        })
        
}

function pokeCards() {
    const cards = pokeData.map(pokemon => {
        return `<div class="data-card">
        <img src="img/paras.png" alt="Image of pokemon" class="card-image">
        <div class="text-container">
            <h2 class="name">${pokemon.name}</h2>
            <ul class="type-container">
                <li class="type-1">Grass</li>
                <li class="type-2">Bug</li>
            </ul>
        </div>
    </div>`
    }).join("");
    cardContainer.innerHTML = cards;
}

fetchData(URL);