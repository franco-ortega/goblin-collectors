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

    if (!rows[0]) return 'There was an error adding this item to the database.';
    return new Goblin(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`SELECT * FROM goblins`);

    console.log(rows);

    if (!rows[0]) return 'There are no goblins. So sad. :(';
    return rows.map((goblin) => new Goblin(goblin));
  }
};
