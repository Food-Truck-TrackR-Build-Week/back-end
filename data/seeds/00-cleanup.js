const cleaner = require('knex-cleaner');
const environment = process.env.NODE_ENV || 'development';

if (environment === 'development') {
  function cleanTables(knex) {
    return cleaner
      .clean(knex, {
        mode: 'truncate',
        restartIdentity: true,
        ignoreTables: ['knex_migrations', 'knex_migrations_lock']
      })
      .then(() => console.log('\n*** Tables truncated. Ready to seed. *** \n'));
  }

  exports.seed = function (knex) {
    return knex.raw('PRAGMA foreign_keys = OFF').then(() => cleanTables(knex));
  };
} else {
  exports.seed = function (knex) {
    return cleaner
      .clean(knex, {
        mode: 'truncate',
        restartIdentity: true,
        ignoreTables: ['knex_migrations', 'knex_migrations_lock']
      })
      .then(() => console.log('\n*** Tables truncated. Ready to seed. *** \n'));
  };
}
