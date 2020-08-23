exports.up = function (knex) {
  return knex.schema
    .createTable('diners', (tbl) => {
      tbl.increments();
      tbl
        .integer('userId')
        .unique()
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('currentLocation', 256).notNullable();
    })
    .createTable('operators', (tbl) => {
      tbl.increments();
      tbl
        .integer('userId')
        .unique()
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
