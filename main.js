const cardContainer = document.querySelector(".card-container");
const typeContainer = document.querySelector(".type-container");
const searchBar = document.querySelector("#search");
const searchContainer = document.querySelector(".search-container");
const genButtons = document.querySelectorAll(".button");
let pokeData = [];
let url = "";

// Event listeners for gen buttons to display a generation of pokemon
genButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        if (event.target === genButtons[0]) {
            url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
        }
        else if (event.target === genButtons[1]) {
            url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=151";
        }
        else if (event.target === genButtons[2]) {
            url = "https://pokeapi.co/api/v2/pokemon?limit=135&offset=251";
        }
        else if (event.target === genButtons[3]) {
            url = "https://pokeapi.co/api/v2/pokemon?limit=107&offset=386";
        }
        else if (event.target === genButtons[4]) {
            url = "https://pokeapi.co/api/v2/pokemon?limit=156&offset=493";
        }
        else if (event.target === genButtons[5]) {
            url = "https://pokeapi.co/api/v2/pokemon?limit=72&offset=649";
        }
        else if (event.target === genButtons[6]) {
            url = "https://pokeapi.co/api/v2/pokemon?limit=88&offset=721";
        }
        else if (event.target === genButtons[7]) {
            url = "https://pokeapi.co/api/v2/pokemon?limit=96&offset=809";
        }
        else if (event.target === genButtons[8]) {
            url = "https://pokeapi.co/api/v2/pokemon?limit=112&offset=905";
        }

        //This isn't official generation of pokemon I think
        else if (event.target === genButtons[9]) {
            url = "https://pokeapi.co/api/v2/pokemon?limit=275&offset=1017";
        }
        fetchData(url)
    })
})

document.addEventListener("scroll", () => {
    if (window.scrollY > 145) {
        searchContainer.classList.add("sticky");
    } else {
        searchContainer.classList.remove("sticky");
    }
});

//Event listener for searchbar with a filtering function
searchBar.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase();
    const filteredPokemon = pokeData.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchString);
    })
    return displayPokeCards(filteredPokemon);
})

async function fetchData(genUrl) {
    const response = await fetch(genUrl);
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
            weight: data.weight,
            height: data.height,
        };
    })
    return Promise.all(pokemonPromises)
}

function getPokemonType(types) {
    return types.map(type => `<p class = "type">${type}</p>`).join("");
}

// 2. connect input and search from pokeDex array by using
// the .filter() method
// https://www.jamesqquick.com/blog/build-a-javascript-search-bar/

function displayPokeCards(array) {
    const cards = array.map(pokemon => {
        return `<div class="data-card">
                    <img src="${pokemon.img}" alt="${pokemon.name}" class="card-image">
                    <div class="text-container">
                        <h2 class="name">#${pokemon.id} ${pokemon.name}</h2>
                        <div class="properties-container">
                            ${getPokemonType(pokemon.types)}
                            <p>Kanto</p>
                            <p>${(pokemon.height * 0.1).toFixed(1)} m</p>
                            <p>${(pokemon.weight * 0.1).toFixed(1)} kg</p>
                        </div>
                    </div>
                </div>`
    }).join("");
    cardContainer.innerHTML = cards;
}
