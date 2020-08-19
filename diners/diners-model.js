const db = require('../data/db-config');

module.exports = {
  find,
  findFavoriteTrucks,
  findTruckById,
  addTruckToFavs,
  removeTruckFromFavs
};

function find() {
  return db('diners');
}

function findFavoriteTrucks(id) {
  return db('trucks')
    .join('diners_trucks', 'trucks.id', 'diners_trucks.truckId')
    .where({ 'diners_trucks.dinerId': id });
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

function removeTruckFromFavs() {}
