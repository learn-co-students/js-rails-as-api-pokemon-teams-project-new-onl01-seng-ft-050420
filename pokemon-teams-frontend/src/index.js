const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
  fetchTrainers();
});

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => json.forEach(trainerData => renderTrainer(trainerData)));
}

function renderTrainer(trainer) {
  const trainerCard = document.createElement('div');
  trainerCard.className = 'card';
  trainerCard.setAttribute('data-id', `${trainer.id}`);

  const trainerName = document.createElement('p');
  trainerName.textContent = trainer.name;
  trainerCard.appendChild(trainerName);

  const addBtn = document.createElement('button');
  addBtn.appendChild(document.createTextNode('Add Pokemon'));
  addBtn.setAttribute('data-trainer-id', `${trainer.id}`);
  trainerCard.appendChild(addBtn);
  addBtn.addEventListener('click', addPokemon);

  const pokemonList = document.createElement('ul');
  trainer.pokemons.forEach(function(pokemon) {
    pokemonList.appendChild(renderPokemon(pokemon));
  })

  trainerCard.appendChild(pokemonList);
  document.querySelector('main').appendChild(trainerCard);
}

function addPokemon(e) {
  const pokemonList = e.target.nextSibling;
  const numOfExistingPokemons = pokemonList.children.length;
  if(numOfExistingPokemons >= 6) {
    alert('You have no space on your team for more pokemons');
  } else {
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'trainer_id': parseInt(e.target.dataset.trainerId)
      })
    };
    fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(json => pokemonList.appendChild(renderPokemon(json)));
  }
}

function renderPokemon(pokemon) {
  const pokemonLi = document.createElement('li');
  pokemonLi.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class = "release" data-pokemon-id="${pokemon.id}">Release</button>`;
  pokemonLi.querySelector('button').addEventListener('click', releasePokemon);
  return pokemonLi;
}

function releasePokemon(e) {
  const pokemonId = parseInt(e.target.dataset.pokemonId);
  const configObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'pokemon_id': pokemonId
    })
  };
  fetch(`${POKEMONS_URL}/${pokemonId}`, configObj)
  .then(resp => resp.json())
  .then(json => {
    e.target.parentNode.remove();
  });
}