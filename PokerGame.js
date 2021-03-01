const Player = require("./Player.js");

class PokerGame {

  static idCount = 0;

  state = {
    smallBlind: 0,
    bigBlind: 0,
    players: [],
    turn: null,
    pot: 0,
  }

  constructor(maxPlayers, initialChips, smallBlind) {
    this.id = PokerGame.idCount++;
    this.maxPlayers = maxPlayers;
    this.initialChips = initialChips;
    this.state.smallBlind = smallBlind;
    this.state.bigBlind = 2*smallBlind;
    this.state.players = [];
    this.state.turn = null;
    this.state.pot = 0;
  }

  addPlayer(id, name) {
    const newPlayer = new Player(id, name, this.initialChips);
    if (!this.state.players.length) {
      this.state.players.push(newPlayer);
      this.state.turn = id;
    } else {
      this.state.players.push(newPlayer);
    }
    return newPlayer.id;
  }

  removePlayer(id) {
    this.state.players.map((player, i) => {
      if (player.id == id)
        this.state.players.splice(i, 1);
    });
  }

  getPlayer(id) {
    const player = this.state.players.find((player) => player.id == id );
    return player;
  }

  getState() {
    return this.state;
  }

  placeBet(id, value) {
    const player = this.state.players[0];

    if(player.id == id) {
      console.log(`player${id} bets ${value}`);
      this.state.pot += player.bet(value);
    
    this.state.players.push(this.state.players.shift()); //pushes first to end of array
    console.log(this.state.players[0].id);
    this.state.turn = this.state.players[0].id;
    }
  }

}
module.exports = PokerGame;
