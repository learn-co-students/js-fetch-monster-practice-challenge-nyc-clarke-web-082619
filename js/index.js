document.addEventListener("DOMContentLoaded", () => {
  const monsterContainer = document.getElementById("monster-container");
  const newMonsterDiv = document.getElementById("create-monster");
  const backButton = document.getElementById("back");
  const forwardButton = document.getElementById("forward");
  let pageNum = 1;
  const monsterUrl = `http://localhost:3000/monsters/?_limit=50`;

  function getMonsters(page = 1) {
    url = monsterUrl + `&_page=${page}`;
    return fetch(url)
      .then(resp => {
        return resp.json();
      })
      .then(monster => renderMonsters(monster));
  }

  function postMonster(monsterData) {
    return fetch(monsterUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: monsterData.name.value,
        age: monsterData.age.value,
        description: monsterData.description.value
      })
    })
      .then(resp => {
        return resp.json();
      })
      .then(monster => renderMonsters(monster));
  }

  function renderMonsters(monsterData) {
    for (const monster of monsterData) {
      monsterContainer.innerHTML += `<h1>${monster.name}</h1>
        <h3>Age: ${monster.age}</h3>
        <p>Bio: ${monster.description}</p><br>`;
    }
  }

  function createMonsterForm(event) {
    newMonsterDiv.innerHTML += `<form id='create' ><input type="text" name="name" placeholder="Name">
               <input type="text" name="age" placeholder="Age">
               <input type='text' name='description' placeholder="Description">
               <button type='submit'>Create</button>
        </form>`;
    const createForm = document.getElementById("create");
    createForm.addEventListener("submit", event => {
      event.preventDefault();
      postMonster(event.target);
    });
  }

  backButton.addEventListener("click", event => {
    pageNum - 1 < 1 ? (pageNum = 1) : (pageNum -= 1);
    monsterContainer.innerHTML = "";
    getMonsters(pageNum);
  });

  forwardButton.addEventListener("click", event => {
    pageNum += 1;
    monsterContainer.innerHTML = "";
    getMonsters(pageNum);
  });

  getMonsters();
  createMonsterForm();
});
