const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
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
    id: ID!
    name: String!
    caloriesPerServ: Int!
    category: Category!
    FoodEntries: [FoodEntry!]!
  }

  type FoodEntry {
    id: ID!
    date: DateTime!
    food: Food!
    user: User!
    servingQty: Int!
    mealCategory: MealCategory!
  }

  type Category {
    id: ID!
    name: String!
    foods: [Food!]!
  }

  type MealCategory {
    id: ID!
    name: String!
    foodEntries: [FoodEntry!]!
  }

  type ExerciseEntry {
    id: ID!
    date: DateTime!
    name: String!
    caloriesBurned: Int!
    user: User!
  }
`;
