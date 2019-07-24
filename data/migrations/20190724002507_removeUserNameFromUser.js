exports.up = function(knex, Promise) {
    return knex.schema.table("users", tbl => {
        tbl.dropColumn("username");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", tbl => {
      tbl.string("username");
  });
};
