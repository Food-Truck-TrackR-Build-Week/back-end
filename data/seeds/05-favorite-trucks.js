exports.seed = function (knex) {
  return knex('diners_trucks').insert([
    { dinerId: 1, truckId: 1 },
    { dinerId: 1, truckId: 2 },
    { dinerId: 2, truckId: 1 }
  ]);
};
