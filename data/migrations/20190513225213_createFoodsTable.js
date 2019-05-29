
exports.up = function(knex, Promise) {
  return knex.schema.createTable('foods', tbl => {
    tbl.increments();
    tbl
      .string('foodName',255)
      .notNullable();
      
    tbl
      .integer('caloriesPerServ')
      .notNullable();

    tbl
      .integer('food_category_id')
      .unsigned()
      .references('id')
      .inTable('foodCategories')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('foods');
};
