
exports.up = function(knex, Promise) {
  return knex.schema.createTable('foodEntries', tbl => {
    tbl.increments();
    tbl
      .date('date')
      .notNullable();
    tbl
      .float('servingQty')
      .notNullable();
    tbl
      .integer('food_id')
      .unsigned()
      .references('id')
      .inTable('foods')
      .notNullable();
    tbl
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .notNullable();
    tbl
      .integer('meal_category_id')
      .unsigned()
      .references('id')
      .inTable('mealCategories')
      .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('foodEntries');
};
