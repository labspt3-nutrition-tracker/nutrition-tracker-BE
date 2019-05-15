const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    userType: String!
    calorieGoal: Int!
    weight: Int
    foodEntries: [FoodEntry!]!
    exerciseEntries: [ExerciseEntry!]!
  }

  type Food {
    name: String!
    caloriesPerServ: Int!
    category: Category!
    FoodEntries: [FoodEntry!]!
  }

  type FoodEntry {
    date: DateTime!
    food: Food!
    user: User!
    servingQty: Int!
    mealCategory: MealCategory!
  }

  type Category {
    name: String!
    foods: [Food!]!
  }

  type MealCategory {
    name: String!
    foodEntries: [FoodEntry!]!
  }

  type ExerciseEntry {
    date: DateTime!
    name: String!
    caloriesBurned: Int!
    user: User!
  }
`;
