exports.up = function(knex, Promise) {
  return knex.schema.createTable("foods", tbl => {
    tbl.increments();
    tbl.string("foodName", 255).notNullable();

    tbl.integer("caloriesPerServ").notNullable();

    tbl.float("fats").notNullable();

    tbl.float("carbs").notNullable();

    tbl.float("proteins").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("foods");
};
