module.exports = class Goblin {
  goblin_id;
  goblin_name;
  strength;
  storage;

  constructor(row) {
    this.goblin_id = row.goblin_id;
    this.goblin_name = row.goblin_name;
    this.strength = row.strength;
    this.storage = row.storage;
  }
};
