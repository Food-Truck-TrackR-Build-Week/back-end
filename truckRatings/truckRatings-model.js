const db = require('../data/db-config');

module.exports = {
  add,
  findById,
  findByTruckId,
  remove
};

async function add(customerRating) {
  try {
    const [id] = await db('truckRatings').insert(customerRating, 'id');

    return await findById(id);
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

async function remove(id) {
  try {
    const rating = await findById(id);
    if (!rating) return;

    return db('truckRatings').where({ id }).del();
  } catch (error) {
    throw error;
  }
}
