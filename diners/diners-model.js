const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findFavoriteTrucks,
  findTruckById,
  addTruckToFavs,
  removeTruckFromFavs
};

function find() {
  return db('diners').join('users', 'diners.userId', '=', 'users.id');
}

function findById(id) {
  return db('diners')
    .join('users', 'diners.userId', '=', 'users.id')
    .where({ 'diners.id': id })
    .select(
      'diners.id as id',
      'users.id as userId',
      'username',
      'password',
      'email',
      'currentLocation'
    )
    .first();
}

function findFavoriteTrucks(id) {
  return db('trucks')
    .join('diners_trucks', 'trucks.id', '=', 'diners_trucks.truckId')
    .where({ 'diners_trucks.dinerId': id })
    .select(
      'trucks.id',
      'trucks.operatorId',
      'trucks.imageOfTruck',
      'trucks.cuisineType',
      'trucks.currentLocation',
      'trucks.departureTime'
    );
}

function findTruckById(id) {
  return db('trucks').where({ id }).first();
}

async function addTruckToFavs(dinerId, truckId) {
  const favoriteTrucks = await findFavoriteTrucks(dinerId);
  const found = favoriteTrucks.filter((truck) => truck.id === truckId);

  if (found.length > 0) {
    return favoriteTrucks;
  } else {
    return db('diners_trucks')
      .insert({ dinerId, truckId })
      .then((res) => {
        return findFavoriteTrucks(dinerId);
      });
  }
}

async function removeTruckFromFavs(dinerId, truckId) {
  const favoriteTrucks = await findFavoriteTrucks(dinerId);
  const found = favoriteTrucks.filter((truck) => truck.id === truckId);

  if (found.length > 0) {
    return db('trucks')
      .where({ id: truckId })
      .del()
      .then((res) => {
        return findFavoriteTrucks(dinerId);
      });
  } else {
    return favoriteTrucks;
  }
}
