const pool = require('../utils/pool');

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

  static async insert({ goblinName, strength, storage }) {
    const { rows } = await pool.query(
      `
      INSERT INTO goblins (goblin_name, strength, storage)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [goblinName, strength, storage]
    );

    console.log(rows);

    if (!rows[0]) return 'There was an error adding this item to the database.';
    return new Goblin(rows[0]);
  }
};
