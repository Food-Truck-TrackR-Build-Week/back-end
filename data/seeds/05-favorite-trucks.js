exports.seed = function (knex) {
  return knex('diners_trucks').insert([
    { dinerId: 100001, truckId: 100001 },
    { dinerId: 100001, truckId: 100002 },
    { dinerId: 100002, truckId: 100001 }
  ]);
};
