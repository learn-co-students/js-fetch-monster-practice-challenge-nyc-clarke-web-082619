const URL_PREFIX = 'http://localhost:3000';
let page = 1;
let pageNum = document.querySelector('#page-num');


const monsterContainer = document.querySelector('#monster-container');

let newMonsterForm = document.createElement('form');
newMonsterForm.id = 'monster-form';

let nameInput = document.createElement('input');
nameInput.id = 'name';
nameInput.placeholder = 'name...'

let ageInput = document.createElement('input');
ageInput.id = 'age';
ageInput.placeholder = 'age...'

let descriptionInput = document.createElement('input');
descriptionInput.id = 'description';
descriptionInput.placeholder = 'description...';

let createButton = document.createElement('button');
createButton.value = 'submit';
createButton.id = 'create-button';
createButton.innerText = 'Create';


newMonsterForm.append(nameInput);
nameInput.setAttribute('required', true);
newMonsterForm.append(ageInput);
ageInput.setAttribute('required', true);
newMonsterForm.append(descriptionInput);
descriptionInput.setAttribute('required', true);
newMonsterForm.append(createButton);

document.querySelector('#create-monster').append(newMonsterForm);

newMonsterForm.addEventListener('submit', function(event){
    event.preventDefault();
    let newMonster = {
        name: nameInput.value,
        age: parseFloat(ageInput.value),
        description: descriptionInput.value
    }

    postNewMonster(newMonster);
})


document.addEventListener('DOMContentLoaded', function(){
    let monsters = getMonsters();
    document.querySelector('#forward').addEventListener('click', pageUp);
    document.querySelector('#back').addEventListener('click', pageDown);
})



function postNewMonster(monster){
    fetch(URL_PREFIX + `/monsters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(monster)
    })
    .then(getMonsters(undefined, page))
    .then(alert(`Successfully Created ${monster.name}`))
}






function renderMonster(monster){
    let name = document.createElement('h2');
    name.innerText = monster.name;

    let age = document.createElement('h4');
    age.innerText = `Age: ${monster.age}`;

    let bio = document.createElement('p');
    bio.innerText = `Bio: ${monster.description}`;

    let div = document.createElement('div');
    div.className = 'monster-card';
    div.dataset.id = monster.id;

    [name, age, bio].forEach(function(ele){div.append(ele)});

    return div
}

function getMonsters(limit=50, page=1){
    return fetch(URL_PREFIX  + `/monsters/?_limit=${limit}&_page=${page}`)
        .then(resp => resp.json())
        .then(json => displayMonsterCards(json))
}


function displayMonsterCards(monsterArray){
    monsterContainer.innerHTML = '';
    monsterArray.forEach(function(monster){
        monsterCard = renderMonster(monster);
        monsterContainer.append(monsterCard);
    })
}


function pageUp(){
    page++;
    pageNum.innerText = page;
    getMonsters(undefined, page);
}

function pageDown(){
    if (page > 1){
        page--;
        pageNum.innerText = page;
        getMonsters(undefined, page);
    } else {
        alert('No monsters that way.');
    }
}