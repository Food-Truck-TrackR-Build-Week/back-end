exports.seed = function (knex) {
  return knex('operators').insert([
    { id: 100001, userId: 100003 },
    { id: 100002, userId: 100004 }
  ]);
};
