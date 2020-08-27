exports.seed = function (knex) {
  return knex('diners').insert([
    { id: 100001, userId: 100001 },
    { id: 100002, userId: 100002 }
  ]);
};
