const Trucks = require('./trucks-model');

module.exports = {
  validTruck
};

function validTruck(truck) {
  return Boolean(
    truck.name &&
      truck.imageOfTruck &&
      truck.cuisineType &&
      truck.currentLocation &&
      truck.operatorId
  );
}
