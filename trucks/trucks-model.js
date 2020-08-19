const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findById,
  update
};

async function add(truck) {
  try {
    const [id] = await db('trucks').insert(truck, 'id');

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function find() {
  return db('trucks');
}

function findById(id) {
  return db('trucks').where({ id }).first();
}

function update(changes, id) {
  return db('trucks')
    .where({ id })
    .update(changes)
    .then((count) => {
      return findById(id);
    });
}
