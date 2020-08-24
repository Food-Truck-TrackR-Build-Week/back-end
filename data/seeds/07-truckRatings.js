exports.seed = function (knex) {
  return knex('truckRatings').insert([
    { id: 100001, truckId: 100001, customerRating: 1 },
    { id: 100002, truckId: 100001, customerRating: 2 },
    { id: 100003, truckId: 100002, customerRating: 3 },
    { id: 100004, truckId: 100002, customerRating: 4 }
  ]);
};
