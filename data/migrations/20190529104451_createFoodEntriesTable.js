exports.up = function(knex, Promise) {
  return knex.schema.createTable("foodEntries", tbl => {
    tbl.increments();
    tbl.date("date").notNullable();
    tbl.float("servingQty").notNullable();
    tbl
      .integer("food_id")
      .unsigned()
      .references("id")
      .inTable("foods");
    tbl
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("meal_category_id")
      .unsigned()
      .references("id")
      .inTable("mealCategories");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("foodEntries");
};
