const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Goblin = require('../lib/models/Goblin');
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

  it('gets all goblins', async () => {
    const goblins = await Promise.all(
      [
        { goblinName: 'Veresh', strength: 3, storage: 'medium' },
        { goblinName: 'Vida', strength: 4, storage: 'large' }
      ].map((goblin) => Goblin.insert(goblin))
    );

    const response = await request(app).get('/api/v1/goblins');

    expect(response.body).toEqual([
      {
        goblinId: '1',
        goblinName: 'Veresh',
        strength: 3,
        storage: 'medium'
      },
      {
        goblinId: '2',
        goblinName: 'Vida',
        strength: 4,
        storage: 'large'
      }
    ]);
  });

  it('updates a goblin', async () => {
    const goblin = await Goblin.insert({
      goblinName: 'Veresh',
      strength: 3,
      storage: 'medium'
    });

    const res = await request(app)
      .put(`/api/v1/goblins/${goblin.goblinId}`)
      .send({
        goblinName: 'Veresh',
        strength: 5,
        storage: 'large'
      });

    expect(res.body).toEqual({
      goblinId: '1',
      goblinName: 'Veresh',
      strength: 5,
      storage: 'large'
    });
  });
});
