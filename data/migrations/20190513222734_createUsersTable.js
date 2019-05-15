
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
      .string('firstName', 255);
    tbl
      .string('lastName', 255);
    tbl
      .string('userType');
    tbl
      .integer('calorieGoal');
    tbl
      .float('weight');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
