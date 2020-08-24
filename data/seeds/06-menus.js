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
          menuId: 100001,
          itemName: 'hamburger',
          itemDescription: 'good hamburger',
          itemPrice: 5
        },
        {
          id: 100002,
          menuId: 100001,
          itemName: 'cheeseburger',
          itemDescription: 'okay cheeseburger',
          itemPrice: 6
        },
        {
          id: 100003,
          menuId: 100002,
          itemName: 'pulled pork',
          itemDescription: 'yummy sauce',
          itemPrice: 7
        },
        {
          id: 100004,
          menuId: 100002,
          itemName: 'ribs',
          itemDescription: 'full rack',
          itemPrice: 10
        }
      ]);
    })
    .then(function () {
      return knex('itemPhotos').insert([
        {
          id: 100001,
          menuItemId: 100001,
          url: 'hamburger.jpg'
        },
        {
          id: 100002,
          menuItemId: 100002,
          url: 'cheeseburger.jpg'
        },
        {
          id: 100003,
          menuItemId: 100003,
          url: 'pulledPork.jpg'
        },
        {
          id: 100004,
          menuItemId: 100004,
          url: 'ribs.jpg'
        },
        {
          id: 100005,
          menuItemId: 100001,
          url: 'hamburger2.jpg'
        }
      ]);
    });
};
