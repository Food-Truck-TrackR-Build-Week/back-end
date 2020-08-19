exports.seed = function (knex) {
  return knex('operators').insert([
    { id: 1, userId: 3 },
    { id: 2, userId: 4 }
  ]);
};
