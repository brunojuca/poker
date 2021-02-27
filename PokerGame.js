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

  addPlayer(name) {
    this.players.push(new Player(name, this.initialChips))
  }

  getPlayers() {
    const players = [];
    this.players.map((player) =>  players.push(player.id));
    return players;
  }
}
module.exports = PokerGame;
