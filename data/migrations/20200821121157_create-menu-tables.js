exports.up = function (knex) {
  return knex.schema
    .createTable('menus', (tbl) => {
      tbl.increments();
      tbl
        .integer('truckId')
        .unsigned()
        .notNullable()
        .references('trucks.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('menuItems', (tbl) => {
      tbl.increments();
      tbl.string('itemName', 256).notNullable();
      tbl.string('itemDescription', 256).notNullable();
      tbl.integer('itemPrice').unsigned().notNullable();
    })
    .createTable('itemPhotos', (tbl) => {
      tbl.increments();
      tbl.string('url', 128).notNullable();
      tbl
        .integer('menuItemId')
        .unsigned()
        .notNullable()
        .references('menuItems.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('menus_menuItems', (tbl) => {
      tbl
        .integer('menuId')
        .unsigned()
        .notNullable()
        .references('menus.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('menuItemId')
        .unsigned()
        .notNullable()
        .references('menuItems.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.primary(['menuId', 'menuItemId']);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('menus');
};
