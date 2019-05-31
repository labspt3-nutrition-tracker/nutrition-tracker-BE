exports.up = function(knex, Promise) {
    return knex.schema.table("users", tbl => {
        tbl.string("stripe_id");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", tbl => {
      tbl.dropColumn("stripe_id");
  });
};
