const Player = require("./Player.js");

class PokerGame {

  static idCount = 0; 

  constructor(maxPlayers, initialChips, smallBlind) {
    this.id = PokerGame.idCount++;
    this.maxPlayers = maxPlayers;
    this.initialChips = initialChips;
    this.smallBlind = smallBlind;
    this.bigBlind = 2*smallBlind;
    this.players = new Array(maxPlayers);
  }

  addPlayer(id, name) {
    this.players.push(new Player(name, this.initialChips))
  }

  removePlayer(id) {
    this.players.map((player, i) => {
      if (player.id == id)
        this.players.splice(i, 1);
    });
  }

  getPlayers() {
    const players = [];
    this.players.map((player) => players.push({
      id: player.id,
      name: player.name
    }));
    return players;
  }
}
module.exports = PokerGame;
