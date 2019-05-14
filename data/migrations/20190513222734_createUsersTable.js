
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl
      .string('email')
      .notNullable()
      .unique();
    tbl
      .string('username', 255)
      .unique();
    tbl
      .string('name', 255);
    tbl
      .string('user_type');
    tbl
      .integer('calorie_goal');
    tbl
      .float('weight');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
