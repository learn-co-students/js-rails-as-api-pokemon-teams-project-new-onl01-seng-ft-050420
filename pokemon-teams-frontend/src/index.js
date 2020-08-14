const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const cardCollection = document.querySelector('main');

//Load DOM

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers();
});


//Functions
function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => json.data.forEach(trainer => addCard(trainer)))
}

function addCard(trainer) {
    let cardDiv = document.createElement('div');
    let cardTitle = document.createElement('p')
    cardTitle.innerText = `${trainer.attributes.name}`
    
    let addPokButton = document.createElement('button')
    addPokButton.id = `data-trainer-${trainer.id}`
    addPokButton.innerText = 'Add Pokemon'

    let pokeUl = document.createElement('ul');
    pokeUl.id = `poke-trainer-${trainer.id}`

    cardDiv.classList.add('card')
    cardDiv.id = `data-${trainer.id}`
    cardDiv.append(cardTitle, addPokButton, pokeUl)
    
    //loop over pokemons
    trainer.attributes.pokemons.forEach(pokemon => {
        let releaseButton = document.createElement('button')
        releaseButton.classList.add('release')
        releaseButton.id = `data-pokemon-${pokemon.id}`
        releaseButton.innerText = 'Release'
        releaseButton.addEventListener('click', removePokemon)

        let li = document.createElement('li');
        li.innerText = `${pokemon.nickname} (${pokemon.species})`;
        li.appendChild(releaseButton);
        pokeUl.appendChild(li)
    });
    cardCollection.appendChild(cardDiv)
    addPokButton.addEventListener('click', addPokemon)
}

function addPokemon(e) {
    let pokemonCount = e.target.nextElementSibling.children.length
    if (pokemonCount < 6) {
        let newId = `${e.target.id.split("data-trainer-").join("")}`
        let trainerId = {
            trainer_id: newId
        }

        let configObj = {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(trainerId)
        }

        fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(json => appendPokemon(json.data.attributes))
    } else {
        alert('You cannot have more than 6 Pokemons NERD!')
    }
}

function appendPokemon(pokemon) {
    let trainerUl = document.querySelector(`ul#poke-trainer-${pokemon.trainer_id}`);
    
    let releaseButton = document.createElement('button')
    releaseButton.classList.add('release')
    releaseButton.id = `data-pokemon-${pokemon.id}`
    releaseButton.innerText = 'Release'
    releaseButton.addEventListener('click', removePokemon)

    let li = document.createElement('li');
    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    li.appendChild(releaseButton);
    trainerUl.appendChild(li)
}

function removePokemon(e) {
    let getPokeId = `${e.target.id.split("data-pokemon-").join("")}`
    let pokemonId = {
        id: getPokeId
    }

    let configObj = {
        method: 'DELETE', 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(pokemonId)
    }

    fetch(POKEMONS_URL + `/${getPokeId}`, configObj)
    .then(resp => resp.json())
    .then(json => e.target.parentNode.remove())
}

