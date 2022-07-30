const { Router } = require('express');
const Goblin = require('../models/Goblin');

module.exports = Router().post('/', (req, res, next) => {
  Goblin.insert(req.body)
    .then((goblin) => res.send(goblin))
    .catch(next);
});
