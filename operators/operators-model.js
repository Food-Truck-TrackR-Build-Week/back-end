const db = require('../data/db-config');

module.exports = {
  find,
  findTrucksOwned
};

function find() {
  return db('operators');
}

function findTrucksOwned(id) {
  return db('trucks').where({ operatorId: id });
}
