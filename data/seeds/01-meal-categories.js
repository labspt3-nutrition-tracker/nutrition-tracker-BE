exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("mealCategories")
    .truncate()
    .then(function() {
      return knex("mealCategories").insert([
        { mealCategoryName: "Breakfast" },
        { mealCategoryName: "Lunch" },
        { mealCategoryName: "Snack" },
        { mealCategoryName: "Dinner" }
      ]);
    });
};
