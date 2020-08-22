const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findByUserId,
  findTrucksOwned
};

function find() {
  return db('operators').join('users', 'operators.userId', '=', 'users.id');
}

function findById(id) {
  return db('operators')
    .join('users', 'operators.userId', '=', 'users.id')
    .where({ 'operators.id': id })
    .select(
      'operators.id as id',
      'users.id as userId',
      'username',
      'password',
      'email'
    )
    .first();
}

function findByUserId(userId) {
  return db('operators')
    .join('users', 'operators.userId', '=', 'users.id')
    .where({ 'operators.userId': userId })
    .select(
      'operators.id as id',
      'users.id as userId',
      'username',
      'password',
      'email'
    )
    .first();
}

function findTrucksOwned(id) {
  return db('trucks').where({ operatorId: id });
}
