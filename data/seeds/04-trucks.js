exports.seed = function (knex) {
  return knex('trucks').insert([
    { id: 1, imageOfTruck: 'truck.jpg', cuisineType: 'thai', operatorId: 1 },
    { id: 2, imageOfTruck: 'truck.jpg', cuisineType: 'bbq', operatorId: 2 }
  ]);
};
