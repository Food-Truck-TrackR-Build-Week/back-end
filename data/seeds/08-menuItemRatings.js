exports.seed = function (knex) {
  return knex('menuItemRatings').insert([
    { id: 100001, menuItemId: 100001, customerRating: 1 },
    { id: 100002, menuItemId: 100002, customerRating: 2 },
    { id: 100003, menuItemId: 100003, customerRating: 3 },
    { id: 100004, menuItemId: 100004, customerRating: 4 }
  ]);
};
