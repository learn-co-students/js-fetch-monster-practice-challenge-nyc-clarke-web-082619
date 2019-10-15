document.addEventListener('DOMContentLoaded', function(){
const monsterContainer = document.getElementById('monster-container');
const createMonster = document.getElementById('create-monster');
const form = document.createElement('form');
const backButton = document.querySelector('#back');
const forwardButton = document.querySelector('#forward');
let pageNum = 1;


    function getMonsters(pageNum){     
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(response => response.json())
    .then(monsters => { 
        monsters.forEach(function(monster){
        const monsterCard = document.createElement('div')
            monsterCard.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>${monster.age}</h4>
            <p>${monster.description}</p>
            `
            monsterContainer.append(monsterCard)
            })
        })
    }

    getMonsters(pageNum);
    
    form.innerHTML = `
    <input type="text" name="name" placeholder="name"></input>
    <input type="text" name="age" placeholder="age"></input>
    <input type="text" name="desc" placeholder="description"></input>
    <button type="submit">Create Monster</button>
    `

    createMonster.append(form);

    form.addEventListener('submit', function(event){
        event.preventDefault();

        const monsterName = event.target.name.value;
        const monsterAge = event.target.age.value;
        const monsterDesc = event.target.desc.value;
        
            fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: monsterName, age: monsterAge, desc: monsterDesc 
                })  
            })
         
        monsterContainer.append(newMonster(monsterName, monsterAge, monsterDesc));
    })


    backButton.addEventListener('click', function(event){
            if (pageNum -1 < 1) {
                pageNum = 1;
                alert("Can't go back")
            } else {
                pageNum -= 1
            };
            monsterContainer.innerHTML = "";
            getMonsters(pageNum);
            console.log(event.target)
         
    })

    forwardButton.addEventListener('click', function(event){
            pageNum += 1;
        monsterContainer.innerHTML = "";
        getMonsters(pageNum);

            console.log(event.target)
         
    })
})



function newMonster(monsterName, monsterAge, monsterDesc){
   const newMonsterCard = document.createElement('div')
            newMonsterCard.innerHTML = `
            <h2>${monsterName}</h2>
            <h4>${monsterAge}</h4>
            <p>${monsterDesc}</p>
            `
        return newMonsterCard;
}
//get monsters from api x
//make monster card (div) x
// append that card to the monster container x
// only show the first 50 monsters on page load x