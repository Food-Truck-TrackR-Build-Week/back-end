exports.seed = function (knex) {
  return knex('diners').insert([
    { id: 1, currentLocation: 'GA', userId: 1 },
    { id: 2, currentLocation: 'WY', userId: 2 }
  ]);
};
