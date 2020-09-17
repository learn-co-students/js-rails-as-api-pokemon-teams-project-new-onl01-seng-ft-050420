const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


fetchTrainers()



function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => console.log(json))
}

// function listTeams(json){
//     const main = document.querySelector('main')
//     const trainers = [...json]
//     trainers.forEach((trainer) => {
//         let pokemons = [...trainer.pokemons]
//         let listPokemons = pokemons.map(pokemon => `<li id="${pokemon.id}"> ${pokemon.nickname} (${pokemon.species}) <button type='button' class="release"> Release </button></li>`)
//         main.innerHTML += `<ul><p> ${trainer.name} </p><button> Add Pokemon </button> ${listPokemons.join(' ')} </ul>`
//     })
// }

// function release(){
//     const pokeButton = document.querySelectorAll('.release')
//     const releaseButtons = [...pokeButton]

//     for (let button of releaseButtons){
//         button.addEventListener('click', function(e){
//             e.preventDefault()
//             let pokeId = e.target.parentElement.id
//             console.log(pokeId)
//             deleteRequest(pokeId)
//         })
//     }
// }

// function deleteRequest(pokemon){
//     let formData = {id: pokemon}
//     let configObj = {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(formData)
//     }
//     fetch(`${POKEMONS_URL}/${pokemon}`, configObj)
//     .then(response => response.json())
//     .then(obj => console.log(obj))
//     .catch(error => console.log(error))
// }
