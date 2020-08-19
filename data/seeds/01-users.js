const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync('password', 8);

exports.seed = function (knex) {
  return knex('users').insert([
    { id: 1, username: 'diner1', password, email: 'diner1@gmail.com' },
    { id: 2, username: 'diner2', password, email: 'diner2@gmail.com' },
    { id: 3, username: 'operator1', password, email: 'operator1@gmail.com' },
    { id: 4, username: 'operator2', password, email: 'operator2@gmail.com' }
  ]);
};
