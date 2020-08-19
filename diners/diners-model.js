const db = require('../data/db-config');

module.exports = {
  find,
  findFavoriteTrucks
};

function find() {
  return db('diners');
}

function findFavoriteTrucks(id) {
  return db('trucks')
    .join('diners_trucks', 'trucks.id', 'diners_trucks.truckId')
    .where({ 'diners_trucks.dinerId': id });
}
