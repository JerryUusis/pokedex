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

    pokeData = await fetchPokemonProperties(data.results);

    pokeCards();
}

async function fetchPokemonProperties(array) {
    const pokemonPromises = array.map(async (item) => {
        const response = await fetch(item.url);
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            img: data.sprites.other['official-artwork'].front_default,
            types: data.types,
        };
    })
    return Promise.all(pokemonPromises)
}

// 2. connect input and search from pokeDEx array by using
// the .filter() method
// https://www.jamesqquick.com/blog/build-a-javascript-search-bar/

function pokeCards() {
    const cards = pokeData.map(pokemon => {
        return `<div class="data-card">
                    <img src="${pokemon.img}" alt="Image of pokemon" class="card-image">
                    <div class="text-container">
                        <h2 class="name">${pokemon.name}</h2>
                        <div class="properties-container">
                            <p>Type 1</p>
                            <p>Type 2</p>
                            <p>Kanto</p>
                            <p>Height: 50cm</p>
                            <p>Weight: 10kg</p>
                        </div>
                    </div>
                </div>`
    }).join("");
    cardContainer.innerHTML = cards;
}

fetchData();