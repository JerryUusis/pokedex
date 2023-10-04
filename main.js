const URL = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
const cardContainer = document.querySelector(".card-container");
const typeContainer = document.querySelector(".type-container");
let pokeData = [];

async function fetchData(url) {
    await fetch(url)
        .then(res => res.json())
        .then(data => {
            const fetches = data.results.map((item) => {
                return fetch(item.url)
                    .then((res) => res.json())
                    .then((data) => {
                        return {
                            id: data.id,
                            name: data.name,
                            img: data.sprites.other["official-artwork"].front_default,
                            types: data.types,
                        };
                    });
            });
            Promise.all(fetches).then((res) => {
                pokeData = res;
                pokeCards();
            })
        })
}

function pokeCards() {
    const cards = pokeData.map(pokemon => {
        console.log(pokemon)
        return `<div class="data-card">
        <img src="${pokemon.img}" alt="Picture of ${pokemon.name}" class="card-image">
        <div class="text-container">
            <h2 class="name">${pokemon.name}</h2>
            <div class="type-container">
                ${pokemon.types.map((type) => getTypes(type)).join("")}</p>
            </div>
        </div>
    </div>`
    }).join("");
    cardContainer.innerHTML = cards;
}

function getTypes(type) {
    if (type !== "") {
        return `<p>${type.type.name}</p>`
    }
}

fetchData(URL);