const db = require('../data/db-config');

module.exports = {
  findById,
  findByTruckId
};

function findById(id) {
  return db('menus')
    .join('menus_menuItems', 'menus.id', '=', 'menus_menuItems.menuId')
    .join('menuItems', 'menus_menuItems.menuItemId', '=', 'menuItems.id')
    .where({ 'menus.id': id })
    .select(
      'menuItems.id',
      'menuItems.itemName',
      'menuItems.itemDescription',
      'menuItems.itemPrice'
    )
    .orderBy('menuItems.id');
}

function findByTruckId(truckId) {
  return db('menus')
    .join('menus_menuItems', 'menus.id', '=', 'menus_menuItems.menuId')
    .join('menuItems', 'menus_menuItems.menuItemId', '=', 'menuItems.id')
    .where({ 'menus.truckId': truckId })
    .select(
      'menuItems.id',
      'menuItems.itemName',
      'menuItems.itemDescription',
      'menuItems.itemPrice'
    )
    .orderBy('menuItems.id');
}
