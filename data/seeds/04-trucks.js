exports.seed = function (knex) {
  return knex('trucks').insert([
    {
      id: 100001,
      imageOfTruck: 'truck.jpg',
      cuisineType: 'thai',
      operatorId: 100001,
      currentLocation: 'GA'
    },
    {
      id: 100002,
      imageOfTruck: 'truck.jpg',
      cuisineType: 'bbq',
      operatorId: 100002,
      currentLocation: 'WY'
    }
  ]);
};
