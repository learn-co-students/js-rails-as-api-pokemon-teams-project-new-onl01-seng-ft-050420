const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => trainersInfo(data.data));

    function trainersInfo(trainers){
        let container = document.getElementById("trainers")
        for (const trainer of trainers){
            let card = document.createElement("div");
            card.setAttribute('class','card');
            card.setAttribute('data-id',`${trainer.id}`);
            let trainerName = document.createElement("p")
            trainerName.innerText = `${trainer.attributes.name}`
            card.appendChild(trainerName);
            container.appendChild(card);
            let cardButton = document.createElement("button");
            cardButton.setAttribute("data-trainer-id",`${trainer.id}`);
            cardButton.innerText = "Add Pokemon"
            cardButton.addEventListener("click",(event) => {
                if (trainer.attributes.pokemons.length < 6){
                    let configObj = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({trainer_id: event.target.getAttribute('data-trainer-id')})
                    };
                    return fetch(POKEMONS_URL, configObj)
                    .then(resp => resp.json())
                    .then(pokemon => {
                        let trainerPokemonList = document.getElementById(`trainer-${pokemon.data.attributes.trainer_id}-pokemon`)
                        let listItem = document.createElement("li");
                        let itemButton = document.createElement("button");
                        itemButton.setAttribute('class','release')
                        itemButton.setAttribute('data-pokemon-id',`${pokemon.data.id}`)
                        itemButton.innerText = "Release"
                        listItem.innerHTML =`${pokemon.data.attributes.nickname} (${pokemon.data.attributes.species})`;
                        listItem.appendChild(itemButton);
                        trainerPokemonList.appendChild(listItem);                     
                    });
                } else {
                    alert("Your team is full")    
                }
            })
            card.appendChild(cardButton);
            let pokemonlist = document.createElement("ul");
            pokemonlist.setAttribute('id',`trainer-${trainer.id}-pokemon`)
            for (const pokemon of trainer.attributes.pokemons){
                let pokemonName = pokemon.nickname;
                let species = pokemon.species;
                let listItem = document.createElement("li");
                let itemButton = document.createElement("button");
                itemButton.setAttribute('class','release')
                itemButton.setAttribute('data-pokemon-id',`${pokemon.id}`)
                itemButton.innerText = "Release"
                listItem.innerHTML =`${pokemonName} (${species})`;
                listItem.appendChild(itemButton);
                pokemonlist.appendChild(listItem);
            }
            card.appendChild(pokemonlist)
        }


      }

});

