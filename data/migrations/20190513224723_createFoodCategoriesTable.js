
exports.up = function(knex, Promise) {
  return knex.schema.createTable('foodCategories', tbl => {
    tbl.increments();
    tbl
      .string('foodCategoryName')
      .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('foodCategories');
};
