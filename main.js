const cardContainer = document.querySelector(".card-container");
const typeContainer = document.querySelector(".type-container");
const searchBar = document.querySelector("#search");
let pokeData = [];

searchBar.addEventListener("keyup", (event) => {
    console.log(event.target.value)
    pokeData.filter(pokemon => {
        pokemon.name.contain(event)
    })
})

async function fetchData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const data = await response.json();

    fetchPokemonData(data.results);
    pokeCards();
}

// Gets data from main array and turns it into json and pushes it into to pokeData array
async function fetchPokemonData(array) {
    array.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        pokeData.push(data);
    })
}

// 2. connect input and search from pokeDEx array by using
// the .filter() method
// https://www.jamesqquick.com/blog/build-a-javascript-search-bar/

function pokeCards() {
    const cards = pokeData.map(pokemon => {
        return `<div class="data-card">
        <img src="${pokemon.img}" alt="Picture of ${pokemon.name}" class="card-image">
        <div class="text-container">
            <h2 class="name">${pokemon.name}</h2>
            <div class="type-container">
                <p></p>
            </div>
        </div>
    </div>`
    }).join("");
    cardContainer.innerHTML = cards;
}

fetchData();