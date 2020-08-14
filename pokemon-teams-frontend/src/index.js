const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const cardCollection = document.querySelector('main')

function fetchTrainers() {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(json => json.forEach(trainer => renderTrainer(trainer)))
        .then(() => addEvents())
}

function addEvents() {
    const addBtns = cardCollection.querySelectorAll('.button-add')
    addBtns.forEach(button => button.addEventListener('click', addPokemon))
}

function renderTrainer(trainer) {
    let addCard = cardCollection.innerHTML +=
    `
    <div class="card" data-id=${trainer.id}>
    <p>${trainer.name}</p>
    <button class="button-add" data-trainer-id=${trainer.id}>Add Pokemon</button>
    <ul class="pokemonList" id='trainer-${trainer.id}'></ul>
    </div>
    `

    let pokemonList = document.querySelector(`#trainer-${trainer.id}`)
    let pokes = trainer.pokemons.forEach(pokemon => pokemonList.appendChild(renderPokemon(pokemon)))

    let releaseBtns = cardCollection.querySelectorAll('.release')
    releaseBtns.forEach(button => button.addEventListener('click', releasePokemon))
}

function renderPokemon(pokemon) {
    let pokemonLi = document.createElement('li')
    pokemonLi.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
    // pokemonLi.querySelector('.release').addEventListener('click', releasePokemon)
    return pokemonLi
}

function renderNewPokemon(pokemon) {
    let pokemonLi = document.createElement('li')
    pokemonLi.innerHTML = `${pokemon.data.attributes.nickname} (${pokemon.data.attributes.species}) <button class="release" data-pokemon-id="${pokemon.data.attributes.id}">Release</button>`
    pokemonLi.querySelector('.release').addEventListener('click', releasePokemon)
    // json.data.attributes
    return pokemonLi
}

function addPokemon(e) {
    const trainerPokemonList = e.target.nextElementSibling
    const pokemonCount = trainerPokemonList.children.length
    const targetId = e.target.dataset.trainerId

    if (pokemonCount < 6) {
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: targetId
            })
        }

        fetch(POKEMONS_URL, configObj)
            .then(res => res.json())
            .then(json => trainerPokemonList.appendChild(renderNewPokemon(json)))
            // alert('You have a new pokemon')
    } else {
        alert('A real trainer knows their limits!')
    }
}

function releasePokemon(e) {
    const targetId = e.target.dataset.pokemonId
    const configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            pokemon_id: targetId
        })
    }

    fetch(`${POKEMONS_URL}/${targetId}`, configObj)
        .then(res => res.json())
        .then(json => e.target.parentNode.remove())
        // alert('Pokemon has been released')
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTrainers();
})