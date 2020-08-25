const db = require('../data/db-config');

module.exports = {
  add,
  findById,
  findByMenuItemId,
  remove
};

async function add(menuItemRating) {
  try {
    console.log('menuItemRating', menuItemRating);
    const [id] = await db('menuItemRatings').insert(menuItemRating, 'id');

    return await findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db('menuItemRatings').where({ id }).first();
}

function findByMenuItemId(menuItemId) {
  return db('menuItemRatings').where({ menuItemId });
}

async function remove(ratingId, menuItemId) {
  try {
    const rating = await findById(ratingId);
    if (!rating || rating.menuItemId != menuItemId) return;

    return db('menuItemRatings').where({ id: ratingId, menuItemId }).del();
  } catch (error) {
    throw error;
  }
}
