const form = document.getElementById('monster-creator');
const container = document.getElementById('monster-container');
const forwardButton = document.getElementById('forward');
const backButton = document.getElementById('back');
const pageNumber = document.getElementById('pageNumber');
let limit = 50;
let page = 1;
pageNumber.innerText = page;

document.addEventListener('DOMContentLoaded', (event) => {
    fetchMonsterData(limit, page);
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target.name.value;
    let age = parseFloat(event.target.age.value);
    let description = event.target.description.value;
    console.log(age);

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            'name': name,
            'age': age,
            'descriptoin': description
        })
    }).then(response => response.json())
    .then(console.log('new data added'));
})

function fetchMonsterData(limit, page){
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
    .then(response => response.json())
    .then(data => {
        showMonsters(data);
    });
}

function showMonsters(data){
    container.innerHTML = '';
    data.forEach(monster =>{
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}</p>
        `;
        container.appendChild(newDiv);
    })  
}

forwardButton.addEventListener('click', function(){
    limit += 50;
    page += 1;
    fetchMonsterData(limit, page);
    pageNumber.innerText = page;
})

backButton.addEventListener('click', function(){
    if (limit>50){
        limit -=50;
    }
    if(page>1){
        page -= 1;
    }
    fetchMonsterData(limit, page);
    pageNumber.innerText = page;
})