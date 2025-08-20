const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokeName = document.getElementById("creature-name");
const pokeId = document.getElementById("creature-id");
const pokeWeight = document.getElementById("weight");
const pokeHeight = document.getElementById("height");
const pokeType = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

const fetchData = async () => {
  try {
    const nameOrId = searchInput.value.toLowerCase()
    const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${nameOrId}`);
    const data = await res.json();
    setCreatureInfo(data);
  } catch (err) {
    alert("Creature not found");
    console.log(err);
  }
};

const setCreatureInfo = data => {
  const { name, id, weight, height, types, sprites, stats } = data;

  pokeName.textContent = name.toUpperCase();
  pokeId.textContent = `#${id}`;
  pokeWeight.textContent = `${weight}`;
  pokeHeight.textContent = `${height}`;
  spriteContainer.innerHTML = `<img src="${sprites.front_default}" alt="${name}">`;

  hp.textContent = stats.hp;
  attack.textContent = stats.attack;
  defense.textContent = stats.defense;
  specialAttack.textContent = stats.special_attack;
  specialDefense.textContent = stats.special_defense;
  speed.textContent = stats.speed;

  types.forEach(obj => {
    const span = document.createElement("span");
    span.textContent = obj.type.name.toUpperCase();
    pokeType.appendChild(span);
  });
};

searchButton.addEventListener("click", e => {
  e.preventDefault();
  fetchData();
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});