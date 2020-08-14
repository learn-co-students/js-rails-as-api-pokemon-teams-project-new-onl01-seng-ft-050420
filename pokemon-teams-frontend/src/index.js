const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(`${BASE_URL}/trainers`)
  .then(res => res.json())
  .then(displayTrainers)

function displayTrainers(trainers_obj) {
  for (trainer of trainers_obj) {
    const card = document.createElement('div')
    card.classList.add('card')
    const btn = document.createElement('button')
    btn.dataset.trainerId = trainer.id
    btn.innerText = 'Add'
    btn.addEventListener('click', addPokemon)
    card.append(btn)
    const ul = document.createElement('ul')
    card.append(ul)
    card.setAttribute('data-id', trainer.id)
    for (pokemon of trainer.pokemons) {
      makeLi(pokemon, ul)
    }
    document.querySelector('main').append(card)
  }
}

function makeLi(pokemon, ul) {
  const li = document.createElement('li')
  li.innerText = `(${pokemon.nickname})`
  const btn = document.createElement('button')
  btn.classList.add('release')
  btn.setAttribute('data-pokemon-id', pokemon.id)
  btn.innerText = 'Release'
  btn.addEventListener('click', releasePokemon)
  li.append(btn)
  ul.append(li)
}

function releasePokemon(e) {
  const id = e.target.dataset.pokemonId
  const parent = e.target.parentElement
  const options = {
    method: 'DELETE',
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    }
  }
  fetch(`${BASE_URL}/pokemons/${id}`, options)
    .then(res => res.json())
    .then((json) =>{
      if (json.status == 200) {
        parent.parentElement.removeChild(parent)
      }
    })
}

function addPokemon(e) {
  let trainer = e.target.dataset.trainerId
  let ul = e.target.parentElement.querySelector('ul')
  const options = {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify({id: trainer})
  }
  fetch(`${BASE_URL}/pokemons`, options)
    .then(res => res.json())
    .then((json) =>{
      if (json.failure) {
        console.log('team is full')
      } else {
        makeLi(json, ul)
      }
    })
}
