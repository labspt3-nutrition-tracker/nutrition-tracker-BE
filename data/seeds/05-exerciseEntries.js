exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("exerciseEntries")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("exerciseEntries").insert([
        { exerciseEntryDate: "05-28-2019", exerciseName: "pullups", caloriesBurned: 60, exercise_entry_user_id: 1 },
        { exerciseEntryDate: "05-27-2019", exerciseName: "cycling", caloriesBurned: 500, exercise_entry_user_id: 1 },
        { exerciseEntryDate: "05-26-2019", exerciseName: "pushups", caloriesBurned: 50, exercise_entry_user_id: 2 }
      ]);
    });
};
