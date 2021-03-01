class Player {

  static idCount = 0;

  constructor(id, name, initialChips) {
    this.id = id;
    this.name = name;
    this.chips = initialChips;
    this.turn = false;
  }

  bet(value) {
    this.chips -= value;
    return value;
  }
}
module.exports = Player;
