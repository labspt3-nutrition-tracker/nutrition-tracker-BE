exports.up = function(knex, Promise) {
    return knex.schema.table("users", tbl => {
        tbl.integer("stripe_id");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", tbl => {
      tbl.dropColumn("stripe_id");
  });
};
