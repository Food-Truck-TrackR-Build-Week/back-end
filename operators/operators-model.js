const db = require('../data/db-config');

module.exports = {
  find,
  findTrucksOwned
};

function find() {
  return db('operators').join('users', 'operators.userid', '=', 'users.id');
}

function findTrucksOwned(id) {
  return db('trucks').where({ operatorId: id });
}
