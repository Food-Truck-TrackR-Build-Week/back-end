const db = require('../data/db-config');

module.exports = {
  add,
  findBy,
  findByTruckId,
  remove
};

async function add(customerRating) {
  try {
    const { truckId, dinerId } = customerRating;
    const rating = await findBy({ truckId, dinerId });
    if (rating) await remove(truckId, dinerId);

    await db('truckRatings').insert(customerRating);

    return await findBy({ truckId, dinerId });
  } catch (error) {
    throw error;
  }
}

function findBy(filter) {
  return db('truckRatings').where(filter).first();
}

function findByTruckId(truckId) {
  return db('truckRatings').where({ truckId });
}

function remove(truckId, dinerId) {
  return db('truckRatings').where({ truckId, dinerId }).del();
}
