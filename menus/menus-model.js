const db = require('../data/db-config');

const MenuItems = require('../menuItems/menuItems-model');

module.exports = {
  findById,
  findByTruckId
  // addMenuItem,
  // removeMenuItem
};

function findById(id) {
  return db('menus')
    .join('menuItems', 'menus.id', '=', 'menuItems.menuId')
    .where({ 'menus.id': id })
    .select(
      'menuItems.id',
      'menuItems.itemName',
      'menuItems.itemDescription',
      'menuItems.itemPrice'
    )
    .orderBy('menuItems.id');
}

async function findByTruckId(truckId) {
  const menuItems = await db('menus')
    .join('menuItems', 'menus.id', '=', 'menuItems.menuId')
    .where({ 'menus.truckId': truckId })
    .select(
      'menuItems.id',
      'menuItems.itemName',
      'menuItems.itemDescription',
      'menuItems.itemPrice'
    )
    .orderBy('menuItems.id');

  for (item of menuItems) {
    item.itemPhotos = await MenuItems.addItemPhotos(item.id);
  }

  return menuItems;
}

// async function addMenuItem(menuId, menuItemId) {
//   const menu = await findById(menuId);
//   const found = menu.filter((menuItem) => menuItem.id === menuItemId);

//   if (found.length > 0) {
//     return menu;
//   } else {
//     return db('menus_menuItems')
//       .insert({ menuId, menuItemId })
//       .then((res) => {
//         return findById(menuId);
//       });
//   }
// }

// async function removeMenuItem(menuId, menuItemId) {
//   const menu = await findById(menuId);
//   const found = menu.filter((menuItem) => menuItem.id === menuItemId);

//   if (found.length > 0) {
//     return db('menus_menuItems')
//       .where({ menuId, menuItemId })
//       .del()
//       .then((res) => {
//         return findById(menuId);
//       });
//   } else {
//     return menu;
//   }
// }
