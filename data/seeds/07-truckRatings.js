exports.seed = function (knex) {
  return knex('truckRatings').insert([
    { truckId: 100001, dinerId: 100001, customerRating: 1 },
    { truckId: 100002, dinerId: 100001, customerRating: 2 },
    { truckId: 100001, dinerId: 100002, customerRating: 3 },
    { truckId: 100002, dinerId: 100002, customerRating: 4 }
  ]);
};
