const db = require('../data/db-config');

module.exports = {
  add,
  findById,
  findByTruckId,
  remove
};

async function add(truckId, rating) {
  try {
    const [id] = await db('truckRatings').insert({ truckId, rating }, 'id');

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db('truckRatings').where({ id }).first();
}

function findByTruckId(truckId) {
  return db('truckRatings').where({ truckId });
}

function remove(id) {
  return db('truckRatings').where({ id }).del();
}
