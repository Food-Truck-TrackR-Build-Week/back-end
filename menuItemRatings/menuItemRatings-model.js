const db = require('../data/db-config');

module.exports = {
  add,
  findBy,
  findByMenuItemId,
  remove
};

async function add(menuItemRating) {
  try {
    const { menuItemId, dinerId } = menuItemRating;
    const rating = await findBy({ menuItemId, dinerId });
    console.log('rating', rating);

    if (rating) await remove(menuItemId, dinerId);

    await db('menuItemRatings').insert(menuItemRating);

    return await findBy({ menuItemId, dinerId });
  } catch (error) {
    throw error;
  }
}

function findBy(filter) {
  return db('menuItemRatings').where(filter).first();
}

function findByMenuItemId(menuItemId) {
  return db('menuItemRatings').where({ menuItemId });
}

function remove(menuItemId, dinerId) {
  return db('menuItemRatings').where({ menuItemId, dinerId }).del();
}
