exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("foodEntries")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("foodEntries").insert([
        { date: "05-28-2019", servingQty: 1, food_id: 1, user_id: 1, meal_category_id: 1 },
        { date: "05-28-2019", servingQty: 1, food_id: 2, user_id: 1, meal_category_id: 2 },
        { date: "05-28-2019", servingQty: 1, food_id: 3, user_id: 1, meal_category_id: 2 },
        { date: "05-28-2019", servingQty: 1, food_id: 3, user_id: 1, meal_category_id: 3 },
        { date: "05-28-2019", servingQty: 1, food_id: 4, user_id: 1, meal_category_id: 4 },
        { date: "05-28-2019", servingQty: 1, food_id: 1, user_id: 2, meal_category_id: 1 },
        { date: "05-28-2019", servingQty: 1, food_id: 2, user_id: 2, meal_category_id: 2 },
        { date: "05-28-2019", servingQty: 1, food_id: 3, user_id: 2, meal_category_id: 4 },
        { date: "05-27-2019", servingQty: 1, food_id: 1, user_id: 3, meal_category_id: 1 },
        { date: "05-27-2019", servingQty: 1, food_id: 2, user_id: 3, meal_category_id: 2 },
        { date: "05-27-2019", servingQty: 1, food_id: 3, user_id: 3, meal_category_id: 4 },
        { date: "05-27-2019", servingQty: 1, food_id: 3, user_id: 3, meal_category_id: 3 },
        { date: "05-27-2019", servingQty: 1, food_id: 5, user_id: 3, meal_category_id: 4 }
      ]);
    });
};
