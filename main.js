const cardContainer = document.querySelector(".card-container");
const typeContainer = document.querySelector(".type-container");
const searchBar = document.querySelector("#search");
const searchContainer = document.querySelector(".search-container");
let pokeData = [];

document.addEventListener("scroll", () => {
    if (window.scrollY > 145) {
        searchContainer.classList.add("sticky");
    } else {
        searchContainer.classList.remove("sticky");
    }
})

//Event listener for searchbar with a filtering function
searchBar.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase();
    const filteredPokemon = pokeData.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchString);
    })
    return displayPokeCards(filteredPokemon);
})

async function fetchData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const data = await response.json();
    
    pokeData = await fetchPokemonProperties(data.results);
    displayPokeCards(pokeData);
}

async function fetchPokemonProperties(array) {
    const pokemonPromises = array.map(async (item) => {
        const response = await fetch(item.url);
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            img: data.sprites.other['official-artwork'].front_default,
            //List type names
            types: data.types.map(item => item.type.name),
        };
    })
    return Promise.all(pokemonPromises)
}

function getPokemonType(types) {
    return types.map(type => `<p>${type}</p>`).join("");
}

// 2. connect input and search from pokeDex array by using
// the .filter() method
// https://www.jamesqquick.com/blog/build-a-javascript-search-bar/

function displayPokeCards(array) {
    const cards = array.map(pokemon => {
        return `<div class="data-card">
                    <img src="${pokemon.img}" alt="Image of pokemon" class="card-image">
                    <div class="text-container">
                        <h2 class="name">${pokemon.name}</h2>
                        <div class="properties-container">
                            ${getPokemonType(pokemon.types)}
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