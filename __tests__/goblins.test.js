const fs = require('fs');
const pool = require('../lib/utils/pool');

describe('Goblin endpoint tests', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/database.sql', 'utf-8')));

  afterAll(() => pool.end());

  it('creates a fake test', async () => {
    const fake = 'FAKE';

    console.log(fake);

    expect(true).toEqual(true);
  });
});
