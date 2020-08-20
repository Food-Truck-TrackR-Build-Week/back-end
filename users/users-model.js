const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findBy,
  findById
};

async function add(user, userType) {
  try {
    const [id] = await db('users').insert(
      {
        username: user.username,
        password: user.password,
        email: user.email
      },
      'id'
    );

    if (userType === 'diner') {
      await db('diners').insert({ currentLocation: user.location, userId: id });
    } else {
      await db('operators').insert({ userId: id });
    }

    return id;
  } catch (error) {
    throw error;
  }
}

function findBy(filter) {
  return db('users').where(filter).orderBy('id');
}

function find() {
  return db('users');
}

function findById(id) {
  return db('users').where({ id }).first();
}
