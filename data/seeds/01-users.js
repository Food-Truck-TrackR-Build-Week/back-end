exports.seed = function (knex) {
  return knex('users').insert([
    { id: 1, username: 'abl', password: 'password', email: 'abl@gmail.com' },
    { id: 2, username: 'pcl', password: 'password', email: 'pcl@gmail.com' },
    { id: 3, username: 'jgl', password: 'password', email: 'jgl@gmail.com' }
  ]);
};
