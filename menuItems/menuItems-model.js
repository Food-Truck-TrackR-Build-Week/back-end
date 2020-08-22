const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findById,
  update,
  remove
};

async function add(menuItem) {
  try {
    const [id] = await db('menuItems').insert(menuItem, 'id');

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function find() {
  return db('menuItems');
}

function findById(id) {
  return db('menuItems').where({ id });
}

function update(changes, id) {
  return db('menuItems')
    .where({ id })
    .update(changes)
    .then((count) => {
      return findById(id);
    });
}

function remove(id) {
  return db('menuItems').where({ id }).del();
}
