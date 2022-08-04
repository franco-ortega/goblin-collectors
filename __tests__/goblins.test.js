const pool = require('../lib/utils/pool');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Goblin = require('../lib/models/Goblin');

describe('Goblin endpoint tests', () => {
  const goblinUrl = '/api/v1/goblins';

  beforeEach(() => pool.query(fs.readFileSync('./sql/database.sql', 'utf-8')));
  afterAll(() => pool.end());

  it('creates a goblin', async () => {
    const response = await request(app)
      .post(goblinUrl)
      .send({ goblinName: 'Veresh', strength: 3, storage: 'medium' });

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
        { goblinName: 'Vida1', strength: 1, storage: 'medium' },
        { goblinName: 'Vida2', strength: 2, storage: 'large' },
        { goblinName: 'Vida3', strength: 3, storage: 'large' },
        { goblinName: 'Vida4', strength: 4, storage: 'large' },
        { goblinName: 'Vida5', strength: 5, storage: 'large' }
      ].map((goblin) => Goblin.insert(goblin))
    );

    const response = await request(app).get(goblinUrl);

    expect(response.body).toEqual(expect.arrayContaining(goblins));
  });

  it('updates a goblin', async () => {
    const goblin = await Goblin.insert({
      goblinName: 'Veresh',
      strength: 3,
      storage: 'medium'
    });

    const res = await request(app)
      .put(`${goblinUrl}/${goblin.goblinId}`)
      .send({ goblinName: 'Veresh', strength: 5, storage: 'large' });

    expect(res.body).toEqual({
      goblinId: '1',
      goblinName: 'Veresh',
      strength: 5,
      storage: 'large'
    });
  });

  it('deletes a goblin', async () => {
    const goblin = await Goblin.insert({
      goblinName: 'Veresh',
      strength: 3,
      storage: 'medium'
    });

    await Goblin.insert({
      goblinName: 'Veresh2',
      strength: 3,
      storage: 'medium'
    });

    const res = await request(app).delete(`${goblinUrl}/${goblin.goblinId}`);

    console.log(goblin);
    console.log(res.body);

    expect(res.body).toEqual(goblin);
  });
});
