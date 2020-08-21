exports.seed = function (knex) {
  return knex('diners').insert([
    { id: 100001, currentLocation: 'GA', userId: 1 },
    { id: 100002, currentLocation: 'WY', userId: 2 }
  ]);
};
