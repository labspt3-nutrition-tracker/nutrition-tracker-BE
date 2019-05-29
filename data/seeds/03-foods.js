exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("foods")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("foods").insert([
        { foodName: "apple", caloriesPerServ: 57, fats: 0.12, carbs: 13.68, proteins: 0.25 },
        { foodName: "chicken breast", caloriesPerServ: 172, fats: 9.25, carbs: 0, proteins: 20.85 },
        { foodName: "orange", caloriesPerServ: 47, fats: 0.12, carbs: 11.75, proteins: 0.94 },
        { foodName: "beaf steak", caloriesPerServ: 228, fats: 15.83, carbs: 0, proteins: 20 },
        { foodName: "Tuna Salad", caloriesPerServ: 250, fats: 9.86, carbs: 30.28, proteins: 10.56 }
      ]);
    });
};
