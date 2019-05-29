exports.up = function(knex, Promise) {
  return knex.schema.createTable("mealCategories", tbl => {
    tbl.increments();
    tbl.string("mealCategoryName", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("mealCategories");
};
