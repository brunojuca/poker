class Player {

  static idCount = 0;

  constructor(name, initialChips) {
    this.id = Player.idCount++;
    this.name = name;
    this.chips = initialChips;
  }
}
module.exports = Player;
