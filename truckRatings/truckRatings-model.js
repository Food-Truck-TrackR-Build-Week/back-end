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

async function remove(ratingId, truckId) {
  try {
    const rating = await findById(ratingId);
    if (!rating || rating.truckId != truckId) return;

    return db('truckRatings').where({ id: ratingId, truckId }).del();
  } catch (error) {
    throw error;
  }
}
