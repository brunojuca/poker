const socketURL =
  (typeof(process) !== "undefined"  && process.env.NODE_ENV === "production")
    ? window.location.hostname
    : "localhost:8080";

var socket = io(socketURL, { secure: true }); // https://pokerchipsmanager.herokuapp.com/

var gameState = {};

socket.on("initial-state", function (state) {
  state.players.map((player, i) => {
    if (player.id != socket.id) addPlayer(player);
    else addMyPlayer(player);
  });
  update(state);
});

socket.on("remove-player", function (id) {
  removePlayer(id);
});

socket.on("state-update", function (state) {
  console.log(state);
  update(state);
  state.players.map((player, i) => {
    updatePlayer(player);
  });
});

socket.on("new-player", function (player) {
  console.log(player);
  addPlayer(player);
});

function update(state) {
  console.log(state);
  const pot = document.getElementById("pot");
  pot.innerHTML = `Pote: R$${state.pot.toFixed(2)}`;
}

function addMyPlayer(player) {
  const myPlayerDiv = document.createElement("div");
  document
    .getElementById("my-player")
    .insertBefore(myPlayerDiv, document.getElementById("bet-form"));
  myPlayerDiv.className = "player";
  myPlayerDiv.id = player.id;
  const pName = document.createElement("p");
  const pChips = document.createElement("p");
  myPlayerDiv.appendChild(pName);
  myPlayerDiv.appendChild(pChips);
  pName.id = player.id + "-name";
  pChips.id = player.id + "-chips";
  pName.innerHTML = player.name + (player.turn ? " *" : "");
  pChips.innerHTML = player.chips;
}

function addPlayer(player) {
  const newPlayerDiv = document.createElement("div");
  document.getElementById("players").appendChild(newPlayerDiv);
  newPlayerDiv.className = "player";
  newPlayerDiv.id = player.id;
  const pName = document.createElement("p");
  const pChips = document.createElement("p");
  newPlayerDiv.appendChild(pName);
  newPlayerDiv.appendChild(pChips);
  pName.id = player.id + "-name";
  pChips.id = player.id + "-chips";
  pName.innerHTML = player.name + (player.turn ? " *" : "");
  pChips.innerHTML = player.chips;
}

function removePlayer(id) {
  document.getElementById(id).remove();
}

function updatePlayer(player) {
  const pName = document.getElementById(player.id + "-name");
  const pChips = document.getElementById(player.id + "-chips");
  pName.innerHTML = player.name + (player.turn ? " *" : "");
  pChips.innerHTML = player.chips;
}

function submitbet(event) {
  event.preventDefault();

  const bet = {
    id: 0,
    value: event.target[0].value,
  };
  console.log(bet);
  socket.emit("bet", bet);
}
