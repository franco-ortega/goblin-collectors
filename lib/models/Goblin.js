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
    const { rows } = await pool.query('SELECT * FROM goblins');

    if (!rows[0]) return 'There are no goblins. So sad. :(';
    return rows.map((row) => new Goblin(row));
  }

  static async update(goblinId, { goblinName, strength, storage }) {
    const { rows } = await pool.query(
      `
        UPDATE goblins
        SET
          goblin_name=$1,
          strength=$2,
          storage=$3
        WHERE goblin_id=$4
        RETURNING *
      `,
      [goblinName, strength, storage, goblinId]
    );

    if (!rows[0]) throw Error(`No goblins with id ${goblinId} was found.`);
    return new Goblin(rows[0]);
  }

  static async delete(goblinId) {
    const { rows } = await pool.query(
      `
        DELETE FROM goblins
        WHERE goblin_id=$1
        RETURNING *
      `,
      [goblinId]
    );

    if (!rows[0]) throw Error(`No goblin with id ${goblinId} was found.`);
    return new Goblin(rows[0]);
  }
};
