exports.seed = function (knex) {
  return knex('menuItemRatings').insert([
    { menuItemId: 100001, dinerId: 100001, customerRating: 1 },
    { menuItemId: 100002, dinerId: 100001, customerRating: 2 },
    { menuItemId: 100003, dinerId: 100002, customerRating: 3 },
    { menuItemId: 100004, dinerId: 100002, customerRating: 4 }
  ]);
};
