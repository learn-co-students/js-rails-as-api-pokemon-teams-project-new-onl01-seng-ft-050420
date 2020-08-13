const BASE_URL = 'http://localhost:3000'
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const teamsCollection = document.querySelector('#teams')

function fetchTrainers() {
  fetch(TRAINERS_URL)
    .then((response) => {
      return response.json()
    })
    .then((trainers) => {
      renderTrainers(trainers.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

function renderTrainers(trainers) {
  trainers.forEach((trainer) => {
    teamsCollection.innerHTML += `
    <div class="card" data-id=${trainer.id}>
      <p>${trainer.attributes.name}</p>
      <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul>
      </ul>
    </div>`
    renderPokemons(trainer)
  })
  addButtonListeners()
}

function renderPokemons(trainer) {
  trainer.attributes.pokemons.forEach((pokemon) => {
    const trainerCard = document.querySelector(`[data-id="${pokemon.trainer_id}"]`)
    const memberList = trainerCard.querySelector('ul')
    const teamMember = document.createElement('li')
    teamMember.innerHTML = `${pokemon.nickname} (${pokemon.species})
    <button class="release" data-pokemon-id=${pokemon.id}>Release</button>`
    memberList.appendChild(teamMember)
  })
}

function addButtonListeners() {
  const addButtons = document.querySelectorAll('button.add')
  const releaseButtons = document.querySelectorAll('button.release')
  addButtons.forEach((button) => {
    // console.log('Added addButton to card.')
    button.addEventListener('click', function (e) {
      console.log('Adding a pokemon.')
    })
  })
  releaseButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      console.log(`Deleting ${button.parentElement}.`)
    })
  })
}

document.addEventListener('DOMContentLoaded', function () {
  fetchTrainers()
})
