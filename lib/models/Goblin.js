module.exports = class Goblin {
  goblinId;
  goblinName;
  strength;
  storage;

  constructor(row) {
    this.goblinId = row.goblin_id;
    this.goblinName = row.goblin_name;
    this.strength = row.strength;
    this.storage = row.storage;
  }
};
