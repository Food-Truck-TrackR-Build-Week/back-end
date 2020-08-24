const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findById,
  update,
  remove,
  addItemPhotos
};

async function add(menuItem) {
  try {
    const { itemPhotos } = menuItem;

    if (itemPhotos) {
      delete menuItem.itemPhotos;
    }

    const [id] = await db('menuItems').insert(menuItem, 'id');

    if (itemPhotos) {
      for (const photo of itemPhotos) {
        await db('itemPhotos').insert({
          menuItemId: id,
          url: photo
        });
      }
    }

    return findById(id);
  } catch (error) {
    throw error;
  }
}

async function find() {
  const menuItems = await db('menuItems');

  for (const item of menuItems) {
    item.itemPhotos = await addItemPhotos(item.id);
  }

  return menuItems;
}

async function findById(id) {
  const menuItem = await db('menuItems').where({ id }).first();

  menuItem.itemPhotos = await addItemPhotos(id);

  return menuItem;
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

async function addItemPhotos(id) {
  return (
    await db('itemPhotos').where({ 'itemPhotos.menuItemid': id }).select('url')
  ).map((photo) => (photo = photo.url));
}
