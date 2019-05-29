exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "username1",
          firstName: "firstName1",
          lastName: "lastName1",
          email: "email1",
          userType: "basic",
          calorieGoal: "1700"
        },
        {
          username: "username2",
          firstName: "firstName2",
          lastName: "lastName2",
          email: "email2",
          userType: "basic",
          calorieGoal: "1500"
        },
        {
          username: "username3",
          firstName: "firstName3",
          lastName: "lastName3",
          email: "email3",
          userType: "basic",
          calorieGoal: "1200"
        }
      ]);
    });
};
