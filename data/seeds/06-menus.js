exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('menus')
    .insert([
      { id: 100001, truckId: 100001 },
      { id: 100002, truckId: 100002 }
    ])
    .then(function () {
      return knex('menuItems').insert([
        {
          id: 100001,
          itemName: 'hamburger',
          itemDescription: 'good hamburger',
          itemPrice: 5
        },
        {
          id: 100002,
          itemName: 'cheeseburger',
          itemDescription: 'okayCheeseburger',
          itemPrice: 6
        },
        {
          id: 100003,
          itemName: 'pulled pork',
          itemDescription: 'yummy sauce',
          itemPrice: 7
        },
        {
          id: 100004,
          itemName: 'ribs',
          itemDescription: 'full rack',
          itemPrice: 10
        }
      ]);
    })
    .then(function () {
      return knex('menus_menuItems').insert([
        { menuId: 100001, menuItemId: 100001 },
        { menuId: 100001, menuItemId: 100002 },
        { menuId: 100002, menuItemId: 100003 },
        { menuId: 100002, menuItemId: 100004 }
      ]);
    });
};
