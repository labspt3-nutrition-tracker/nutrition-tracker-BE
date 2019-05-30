
exports.up = function(knex, Promise) {
  return knex.schema.createTable("billing", tbl => {
      tbl.increments();
      tbl.date("date").notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.string("stripeId")
      tbl
        .integer("amount_paid")
        .notNullable();

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("billing")
};
