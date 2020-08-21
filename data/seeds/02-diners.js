exports.seed = function (knex) {
  return knex('diners').insert([
    { id: 100001, currentLocation: 'GA', userId: 100001 },
    { id: 100002, currentLocation: 'WY', userId: 100002 }
  ]);
};
