document.addEventListener("DOMContentLoaded", function() {
  const monsterForm = document.getElementById("create-monster");
  const monsterContainer = document.getElementById("monster-container");
  const backButton = document.getElementById("back");
  const forwardButton = document.getElementById("forward");
  let pageNum = 1;
  const monsterUrl = "http://localhost:3000/monsters/?_limit=50";

  function getMonsters(page = 1) {
    url = monsterUrl + `&_page=${page}`;
    fetch(url)
      .then(response => response.json())
      .then(monster => renderMonster(monster));
  }

  function renderMonster(monsterData) {
    for (const monster of monsterData) {
      monsterContainer.innerHTML += `<h1>${monster.name}</h1>
      <h3>${monster.age}</h3>
      <p>${monster.description}</p>`;
    }
  }

  function createMonsterForm() {
    monsterForm.innerHTML += `<form id='create'>
      <input type="text" name="monsterName" placeholder="Name">
      <input type="float" name="monsterAge" placeholder="Age">
      <input type="textarea" name="monsterDescription" placeholder="Description">
      <button type="submit">Create Monster</button>
      </form>`;
  }
  createMonsterForm();
  getMonsters();
  function postNewMonster() {
    form = document.getElementById("create");
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      const name = document.querySelector("[name=monsterName]").value;
      const age = document.querySelector("[name=monsterAge]").value;
      const description = document.querySelector("[name=monsterDescription]")
        .value;

      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: name,
          age: age,
          description: description
        })
      });
      monsterContainer.append(renderMonster());
    });
  }
  postNewMonster();

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
});
