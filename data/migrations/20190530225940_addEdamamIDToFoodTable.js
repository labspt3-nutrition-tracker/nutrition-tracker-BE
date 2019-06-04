exports.up = function(knex, Promise) {
    return knex.schema.table("foods", tbl => {
        tbl.string("edamam_id");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("foods", tbl => {
      tbl.dropColumn("edamam_id");
  });
};
