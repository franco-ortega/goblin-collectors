const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');

describe('Goblin endpoint tests', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/database.sql', 'utf-8')));

  afterAll(() => pool.end());

  it('creates a goblin', async () => {
    const response = await request(app).post('/api/v1/goblins').send({
      goblinName: 'Veresh',
      strength: 3,
      storage: 'medium'
    });

    expect(response.body).toEqual({
      goblinId: '1',
      goblinName: 'Veresh',
      strength: 3,
      storage: 'medium'
    });
  });
});
