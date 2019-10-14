

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
createButton.innerText = 'Create';

newMonsterForm.append(nameInput);
newMonsterForm.append(ageInput);
newMonsterForm.append(descriptionInput);
newMonsterForm.append(createButton);

document.querySelector('#create-monster').append(newMonsterForm);



function renderMonster(monster){
    let name = document.createElement('h2');
    name.innerText = monster.name;

    let age = document.createElement('h3');
    age.innerText = `Age: ${monster.age}`;

    let bio = document.createElement('p');
    bio.innerText = `Bio: ${monster.description}`;
}