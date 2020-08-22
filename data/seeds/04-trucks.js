exports.seed = function (knex) {
  return knex('trucks').insert([
    {
      id: 100001,
      name: 'truck1',
      imageOfTruck: 'truck.jpg',
      cuisineType: 'thai',
      operatorId: 100001,
      currentLocation: 'GA'
    },
    {
      id: 100002,
      name: 'truck2',
      imageOfTruck: 'truck.jpg',
      cuisineType: 'bbq',
      operatorId: 100002,
      currentLocation: 'WY'
    }
  ]);
};
