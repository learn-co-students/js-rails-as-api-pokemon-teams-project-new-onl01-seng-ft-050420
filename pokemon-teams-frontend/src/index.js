const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName("main");
// let test = document.createElement("div")
// test.innerText = "TEST"
// main[0].appendChild(test);



//document.addEventListener("DOMContentLoaded", displayPokemons());

fetch(TRAINERS_URL).
then(resp => resp.json()).
then(displayTrainers).
catch((error)=> {console.log(error)});

function displayTrainers(trainers){
    for(let t of trainers) {
        displayTrainer(t)};
};

function displayTrainer(trainers){
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    main[0].appendChild(card);
    let title = document.createElement("p");
    title.innerText = `${trainers.name}`;
    card.appendChild(title);
    let greenButton = document.createElement("button");
    greenButton.innerText = "Add pokemon";
    card.appendChild(greenButton);
    for(let i = 0; i< trainers.pokemons.length; i++){
        let li = document.createElement("li")
        li.innerText = `${trainers.pokemons[i].nickname}(${trainers.pokemons[i].species})`
        card.appendChild(li);
        let redButton = document.createElement("button");
        redButton.setAttribute("class", "release")
        redButton.innerText = "Release"
        li.appendChild(redButton);
        redButton.addEventListener("click", ()=>{
            li.remove()
        })

    };



    
    
    

};

