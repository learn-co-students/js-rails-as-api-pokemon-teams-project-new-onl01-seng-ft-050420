const BASE_URL = "http://127.0.0.1:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", () => {
     fetchTrainers(); 
    

})


function fetchTrainers() {
    return fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(displayTrainers)
}

function displayTrainers(json) {
    let trainerListUl = document.getElementById('trainer-list')
    json.forEach( trainer => {
        let li = document.createElement('li')
        li.innerHTML = `<br> ${trainer.name}`
        li.id = `${trainer.id}`
        let addPokemonButton = document.createElement('button')
        addPokemonButton.classList.add('pokemon-trainer')
        addPokemonButton.innerHTML = "Add A Pokemon"
        addPokemonButton.addEventListener("click", handleNewPokemonClick)
        li.appendChild(addPokemonButton)
        trainerListUl.appendChild(li)
        let ulChild = document.createElement('ul')
        trainer.pokemons.forEach( pokemon => {
            let pokemonLi = document.createElement('li')
            pokemonLi.id = `pokemon-${pokemon.id}`
            pokemonLi.innerHTML = `${pokemon.nickname} - ${pokemon.species}`
            let releaseButton = document.createElement('button')
            releaseButton.innerHTML = "Release"
            releaseButton.addEventListener('click', releasePokemon)
            pokemonLi.appendChild(releaseButton)
            ulChild.appendChild(pokemonLi)
        })
        li.appendChild(ulChild)  
    })
}

function handleNewPokemonClick(e) {
    
    const trainerId = e.target.parentElement.id
    
    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }
    fetch(TRAINERS_URL + `/${trainerId}/pokemons`, configObj)
        .then(resp => resp.json())
        .then(addNewPokemon)
        
}

function addNewPokemon(json) {
    
    const newPokemon = document.createElement('li')
    newPokemon.id = `pokemon-${json.id}`
    newPokemon.innerHTML = `${json.nickname} - ${json.species}`
    let releaseButton = document.createElement('button')
    releaseButton.innerHTML = "Release"
    releaseButton.addEventListener('click', releasePokemon)
    newPokemon.appendChild(releaseButton)
    
    const trainer = document.getElementById(json.trainer_id)
    trainer.appendChild(newPokemon)
}

function deletePokemon() {
    const deleteButtons = document.getElementsByClassName('delete')
    for(const button of deleteButtons ) {
        button.addEventListener('click', releasePokemon)
    }
}

function releasePokemon(e) {
    
    const pokemonId = e.target.parentElement.id.split('-')[1]
    let configObj = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }
    
    fetch(POKEMONS_URL + `/${pokemonId}`, configObj)
        
    e.target.parentElement.remove()
    
}

