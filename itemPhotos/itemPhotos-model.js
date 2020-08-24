const db = require('../data/db-config');

module.exports = {
  add,
  // remove,
  findByMenuItemId
};

async function add(menuItemId, url) {
  try {
    const [id] = await db('itemPhotos').insert({ menuItemId, url }, 'id');

    const itemPhotos = await findByMenuItemId(menuItemId);
    return itemPhotos.map((item) => (item = item.url));
  } catch (error) {
    throw error;
  }
}

function findByMenuItemId(id) {
  return db('itemPhotos').where({ menuItemId: id });
}
