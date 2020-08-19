exports.up = function (knex) {
  return knex.schema
    .createTable('diners', (tbl) => {
      tbl.increments();
      tbl.string('currentLocation', 256).notNullable();
      tbl
        .integer('userId')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('operators', (tbl) => {
      tbl.increments();
      tbl
        .integer('userId')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('operators').dropTableIfExists('diners');
};
