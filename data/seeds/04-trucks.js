exports.seed = function (knex) {
  return knex('trucks').insert([
    {
      id: 100001,
      name: 'truck1',
      imageOfTruck: 'truck.jpg',
      cuisineType: 'thai',
      operatorId: 100001,
      currentLocation: '43.587506, -110.827832'
    },
    {
      id: 100002,
      name: 'truck2',
      imageOfTruck: 'truck.jpg',
      cuisineType: 'bbq',
      operatorId: 100002,
      currentLocation: '43.786934, -110.959504'
    }
  ]);
};
