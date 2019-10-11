
    function createMonsterForm() {
        let monsterForm = document.getElementById('create-monster');
        let form = document.createElement('form');
        let nameInput = document.createElement('input');
        nameInput.id = "name";
        nameInput.placeholder = 'name...';
        let ageInput = document.createElement('input');
        ageInput.id = "age";
        ageInput.placeholder = 'age...';
        let descriptionInput = document.createElement('input');
        descriptionInput.id = "description";
        descriptionInput.placeholder = 'description...';
        let submitButton = document.createElement('button');
        submitButton.innerText = 'Create Monster 🤘👹🤘';
        submitButton.id = 'btn';
        form.appendChild(nameInput);
        form.appendChild(ageInput);
        form.appendChild(descriptionInput);
        form.appendChild(submitButton);
        monsterForm.appendChild(form)
    }

document.addEventListener('DOMContentLoaded', function(){
    //create monster display
    let monsterDisplay = document.createElement('div')
    monsterDisplay.id = 'monster-container';
    let page = 1;

    function getMonsters(){
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(resp => {
            return resp.json();
        })
        .then(info =>{
            console.log(info)
           for(const monster of info){
                renderMonster(monster);
            }
        })
    }

    function createMonster(){

        let monster = {};
        monster.name = document.getElementById('name').value;
        monster.age = document.getElementById('age').value;
        monster.description = document.getElementById('description').value;
        monster.id = 'temp';

        if (monster.name !== "" && monster.age !== "" && monster.description !== ""){
            renderMonster(monster);
            fetch('http://localhost:3000/monsters',{
               method: 'POST', 
               headers: {
                   "Content-Type": "application/json",
                   Accept: "application/json"
               },
               body:JSON.stringify({
               'name': monster.name, 
               'age': monster.age, 
               'description': monster.description 
               })
           })
           .then(resp =>{
               return resp.json();
           })
           .then(resource =>{
               document.getElementById('temp').setAttribute('id',resource.id);
           })
        }
    }

    function renderMonster(monster){
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        h2.innerText = monster.name;
        let h4 = document.createElement('h4');
        h4.innerText = monster.age;
        let p = document.createElement('p');
        p.innerText = monster.description;
        div.appendChild(h2);
        div.appendChild(h4);
        div.appendChild(p);
        document.getElementById('monster-container').appendChild(div);

    }

    document.getElementById('forward').addEventListener('click', function(){
        page += 1;
        let container = document.getElementById('monster-container')
        while(container.firstChild){
            container.removeChild(container.firstChild)
        }
        getMonsters();
    })
    document.getElementById('back').addEventListener('click', function(){
        page -= 1;
        let container = document.getElementById('monster-container')
        while(container.firstChild){
            container.removeChild(container.firstChild)
        }
        getMonsters();
    })

    createMonsterForm();
    getMonsters();
    document.getElementById('create-monster').addEventListener('submit', function(event){
        event.preventDefault();
        createMonster();
    })
})
    
    