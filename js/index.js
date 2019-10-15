// NEED TO ADD UPPER PAGE LIMIT

const monsterContainer = document.getElementById('monster-container');
const createMonsterContainer = document.getElementById('create-monster')

// let pageCount = 0
// let allMonstersCount = 0
// let allMonsters = fetch('http://localhost:3000/monsters').then(resp => resp.json()).then(data => data.forEach(monster => allMonstersCount += 1))
// let maxPages = Math.ceil(allMonstersCount/50)


document.addEventListener('DOMContentLoaded', function(){

    let page = 1;
    function fetchMonsters(page){
        fetch('http://localhost:3000/monsters' + `/?_limit=20&_page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => 
            data.forEach(monster => {
                let newMonster = createNewMonster(monster.name, monster.age, monster.description, monster.id)
                monsterContainer.appendChild(newMonster);
            })
    )};

    fetchMonsters();
    
    createMonsterContainer.innerHTML = `
        <form id='add-monster-form'>
            <h3>Add a Monster</h3>
            <input type='text' id='name-input' value='' placeholder="Enter Monster's Name">
            <input type='text' id='age-input' value='' placeholder="Enter Monster's Age">
            <input type='text' id='bio-input' value='' placeholder="Enter Monster's Bio">
            <input type='submit' name ='submit' value='Create Monster' class='submit-btn'>
        </form>
    `

    document.addEventListener('click', function(){
        event.preventDefault();
        
        if(event.target.className === 'submit-btn'){
            let newMonsterName = document.getElementById('name-input').value;
            let newMonsterAge = document.getElementById('age-input').value;
            let newMonsterBio = document.getElementById('bio-input').value;
            
            fetch('http://localhost:3000/monsters', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: newMonsterName,
                    age: newMonsterAge,
                    description: newMonsterBio
                })
            })
            monsterContainer.appendChild(createNewMonster(newMonsterName, newMonsterAge, newMonsterBio));
            document.getElementById('add-monster-form').reset();
        }

        else if(event.target.id === 'forward'){
            if(page >= maxPages){
                alert('On last page????');
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
            else {
                page++;
                monsterContainer.innerHTML = '';
                fetchMonsters(page);
            }

        }

        else if(event.target.id === 'back'){
            if(page === 1){
                alert('On first page????');
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
            else{
                page--;
                monsterContainer.innerHTML = ''
                fetchMonsters(page);
            }
        }

    })
})

function createNewMonster(name, age, description, id){
    let newMonsterCard = document.createElement('div');
    newMonsterCard.innerHTML = `
        <h2>${name}</h2>
        <p>${age} years old</p>
        <p>Bio: ${description}</p>
    `;
    return newMonsterCard
}