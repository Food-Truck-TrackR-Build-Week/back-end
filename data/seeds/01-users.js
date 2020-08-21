const bcrypt = require('bcryptjs');
const password = bcrypt.hashSync('password', 8);

exports.seed = function (knex) {
  return knex('users').insert([
    { id: 100001, username: 'diner1', password, email: 'diner1@gmail.com' },
    { id: 100002, username: 'diner2', password, email: 'diner2@gmail.com' },
    {
      id: 100003,
      username: 'operator1',
      password,
      email: 'operator1@gmail.com'
    },
    {
      id: 100004,
      username: 'operator2',
      password,
      email: 'operator2@gmail.com'
    }
  ]);
};
