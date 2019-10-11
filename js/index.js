document.addEventListener("DOMContentLoaded", () => {

    let pageNum = 1;

    function displayMonster(json){

        let monsterContainer = document.getElementById('monster-container');
        let monsterDiv = document.createElement('div')
        let nameP = document.createElement('p');
        let nameText = document.createTextNode(`name: ${json.name}`);
        nameP.setAttribute('data-id',json.id);

        let ageP = document.createElement('p');
        let ageText = document.createTextNode(`age: ${json.age}`);

        let descriptionP = document.createElement('p');
        let descriptionText = document.createTextNode(`description: ${json.description}`);

        nameP.appendChild(nameText);
        ageP.appendChild(ageText);
        descriptionP.appendChild(descriptionText);

        monsterDiv.appendChild(nameP);
        monsterDiv.appendChild(ageP);
        monsterDiv.appendChild(descriptionP);

        monsterContainer.appendChild(monsterDiv);
    }

    function doFetch(pageNum){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
        .then(response => response.json())
        .then(json => {json.forEach(elem => displayMonster(elem))});
    }

    function deleteMonsters(){
        let mc = document.getElementById('monster-container');
        while(mc.firstChild){
            mc.removeChild(mc.firstChild);
        }
    }

    doFetch(pageNum);



    document.getElementsByTagName('body')[0].addEventListener("click", (event) => {
        let target = event.target;
        if(target.id === "back"){
            if(pageNum === 0){return false}
            else{
                deleteMonsters();
                pageNum = pageNum - 1;
                doFetch(pageNum);
            }
        }
        else if(target.id == "forward"){
            deleteMonsters();
            pageNum = pageNum + 1;
            doFetch(pageNum);
        };
    })

    document.getElementById('monster-form').addEventListener("submit", (event) => {
        event.preventDefault();
        let name = document.getElementById('name-input').value;
        let age = parseInt(document.getElementById('age-input').value, 10);
        let description = document.getElementById('description-input').value;
        let formData = {name: name, age: age, description: description}
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch("http://localhost:3000/monsters", configObj)
        .then(alert("MONSTER CREATED"))
        .catch(error => {alert(`ERROR: ${error}`)})

    })

});