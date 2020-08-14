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
    button.addEventListener('click', function (e) {
      if (button.nextElementSibling.children.length < 6) {
        addPokemon(e)
      } else {
        alert('Team can only have 6 pokemon.')
      }
    })
  })
  releaseButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      releasePokemon(e)
    })
  })
}

function addNewReleaseButtonListener(member) {
  let button = member.firstElementChild
  button.addEventListener('click', function (e) {
    releasePokemon(e)
  })
}

function addPokemon(e) {
  const trainerId = e.target.attributes.getNamedItem('data-trainer-id').value
  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ trainer_id: trainerId }),
  }
  fetch(POKEMONS_URL, configObj)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log('Success:', data)
      // this is not DRY; is basically a copy of the latter half of `renderPokemons`
      const trainerTeam = document.querySelector(`[data-id="${data.trainer_id}"]`)
      const list = trainerTeam.querySelector('ul')
      const member = document.createElement('li')
      member.innerHTML = `${data.nickname} (${data.species})
      <button class="release" data-pokemon-id=${data.id}>Release</button>`
      list.appendChild(member)
      addNewReleaseButtonListener(member)
    })
    .catch(function (error) {
      console.log(error.message)
    })
}

function releasePokemon(e) {
  const pokemonId = e.target.attributes.getNamedItem('data-pokemon-id').value
  let configObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ pokemon_id: pokemonId }),
  }
  fetch(`${POKEMONS_URL}/${pokemonId}`, configObj)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log('Success:', data)
      e.target.parentNode.remove()
    })
    .catch(function (error) {
      console.log(error.message)
    })
}

document.addEventListener('DOMContentLoaded', function () {
  fetchTrainers()
})
