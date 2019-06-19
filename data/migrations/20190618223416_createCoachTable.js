exports.up = function(knex, Promise) {
  return knex.schema.createTable("coach", tbl => {
    tbl
      .integer("coach")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
    .integer("trainee")
    .unsigned()
    .references("id")
    .inTable("users")
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("coach");
};
