exports.up = function (knex) {
  return knex.schema
    .createTable('truckRatings', (tbl) => {
      tbl.increments();
      tbl.integer('customerRating').notNullable();
      tbl
        .integer('truckId')
        .unsigned()
        .notNullable()
        .references('trucks.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('menuItemRatings', (tbl) => {
      tbl.increments();
      tbl.integer('customerRating').notNullable();
      tbl
        .integer('menuItemId')
        .unsigned()
        .notNullable()
        .references('menuItem.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('menuItemRatings')
    .dropTableIfExists('truckRatings');
};
