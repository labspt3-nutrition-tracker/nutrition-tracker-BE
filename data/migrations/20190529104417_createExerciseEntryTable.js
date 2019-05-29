exports.up = function(knex, Promise) {
  return knex.schema.createTable("exerciseEntries", tbl => {
    tbl.increments();
    tbl.date("exerciseEntryDate").notNullable();
    tbl.string("exerciseName", 255).notNullable();
    tbl.integer("caloriesBurned").notNullable();
    tbl
      .integer("exercise_entry_user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("exerciseEntries");
};
