class Player {

  constructor(id, name, initialChips) {
    this.id = Player.idCount++;
    this.name = name;
    this.chips = initialChips;
  }
}
module.exports = Player;
