const URL = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
const cardContainer = document.querySelector(".card-container");
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
                console.log(pokeData)
                pokeCards();
            })
        })
}

function pokeCards() {
    const cards = pokeData.map(pokemon => {
        return `<div class="data-card">
        <img src="${pokemon.img}" alt="Picture of ${pokemon.name}" class="card-image">
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