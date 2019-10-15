const monsterURL = 'http://localhost:3000/monsters/';
let monsterContainer = document.getElementById('monster-container');
let monsterForm = document.getElementsByClassName('monster-form')[0];
let rightNavArrow = document.getElementById('forward');
let leftNavArrow = document.getElementById('back');
let pageNum = 1;
// console.log(leftNavArrow)

// fetch request to show all monsters ====================================================

function getMonsters(pageNum) {
    let url = monsterURL + `?_limit=50&_page=${pageNum}`
    return fetch(url)
        .then(resp => resp.json())
        .then(monsterArray => monsterArray.forEach( monsterObj => {
            let monster = newMonsterCard( monsterObj.name, monsterObj.age, monsterObj.description );
            monsterContainer.append(monster);
        })); 
}

//  create a new monster card =================================================================
function newMonsterCard(name, age, description) {
    const newMonsterCard = document.createElement('div');
    newMonsterCard.classList.add('monster-card');
    newMonsterCard.innerHTML = `
        <h2 class='name'>${name} </h2>
        <h4 class='age'>${age}</h4>
        <p class='description'>${description}</p>
    `;
    return newMonsterCard
}

// add event listener to form and grab inputs; find form ==============================
monsterForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let name = event.target.name.value;
    let age = event.target.age.value;
    let description = event.target.description.value; 
    
    fetch(monsterURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify ({
            name: name,
            age: age,
            description: description,
        }) 
    })
    monsterContainer.append(newMonsterCard(name, age, description));
})

//  nav-bar =================================================
rightNavArrow.addEventListener('click', event => {
    // console.log(event.target)
    pageNum += 1;
    monsterContainer.innerHTML = "";
    getMonsters(pageNum);
})

leftNavArrow.addEventListener("click", event => {
    if (pageNum -1 < 1) {
        pageNum = 1;
        alert("Aint no monsters here")
    } else {
        pageNum -= 1
    };
    monsterContainer.innerHTML = "";
    getMonsters(pageNum);
  });

//  ===================================================================================
getMonsters();




// STEPS TO REACH GOALS:
//  1. Fetch monsters === DONE
//  2. Show on page === DONE
//  3. Add form to create new monster === DONE
    //  Fields for name, age, description and 'Create Monster' button === DONE
//  4. Add Event Listener to Form => Grab inputs === DONE
    //  Monster should be added and saved to the db === DONE
//  5. Make sure Nav Bar at bottom works; add event listener
    //  When clicked, shows next 50 monsters
    //  Can't go negative
