exports.up = function(knex, Promise) {
  return knex.schema.createTable("weightEntries", tbl => {
    tbl.increments();
    tbl.date("date").notNullable();
    tbl.float("weight").notNullable();
    tbl
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("weightEntries");
};
