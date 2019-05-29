exports.up = function(knex, Promise) {
  return knex.schema.table("foods", tbl => {
    tbl.float("fats");

    tbl.float("carbs");

    tbl.float("proteins");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("foods", tbl => {
    tbl.dropColumn("fats");
    tbl.dropColumn("carbs");
    tbl.dropColumn("proteins");
  });
};
