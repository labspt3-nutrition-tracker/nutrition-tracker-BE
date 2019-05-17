const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    getExerciseEntries: [ExerciseEntry!]!
    getExerciseEntryBy(filter: String!): ExerciseEntry!
    getExerciseEntryById(id: ID!): ExerciseEntry!



    # getFoods: [Food!]!
    # getFoodById(foodId: ID!): Food!

    # getMealCategories: [MealCategory!]!
    # getMealCategoryBy(filter: String!): MealCategory!
    # getMealCategoryById(id: ID!): MealCategory!

    # getCurrentUser: User
    # getUsers: [User!]!
    # getUserById(userId: ID!): User
    # getFoodEntriesByUserId(userId: ID!): FoodEntry!
    # getExerciseEntriesByUserId(userId: ID!): ExerciseEntry!

    # getFoodCategories: [FoodCategory!]!
    # getFoodEntriesByFoodId(foodEntryId: ID!): FoodCategory!

    # getFoodEntries: [FoodEntry!]!
    # getFoodEntriesById(id: ID!): FoodEntry!
  },

  type ExerciseEntryUser{
    user: User!
  }

  type Mutation {
    addExerciseEntry(input: ExerciseEntryInput!): ExerciseEntry!
    updateExerciseEntry(id: ID!, input: ExerciseEntryInput!): ExerciseEntry!
    deleteExerciseEntry(id: ID!): Int!

    # addFood(food: Food!): Food!
    # updateFood(foodId: ID!, food: Food!): Food!
    # deleteFood(foodId: ID!): Int!

    # addMealCategory(newCategory: MealCategory!): MealCategory!
    # updateMealCategory(id: ID!, changes: MealCategory!): MealCategory!
    # deleteMealCategory(id: ID!): Int!

    # deleteUser(userId: ID!): Int!
    # updateUser(userId: ID!, user: User!): User!

    # addFoodCategory(newFoodCategory: FoodCategory!): FoodCategory!
    # updateFoodCategory(id: ID!, data: FoodCategory!): FoodCategory!
    # deleteFoodCategory(id: ID!): Int!

    # addFoodEntry(newFoodEntry: FoodEntry!): FoodEntry!
    # updateFoodEntry(id: ID!, data: FoodEntry!): FoodEntry!
    # deleteFoodentry(id: ID!): Int!
  }

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
    category: FoodCategory!
    FoodEntries: [FoodEntry!]!
  }

  type FoodEntry {
    id: ID!
    date: String!
    food: Food!
    user: User!
    servingQty: Int!
    mealCategory: MealCategory!
  }

  type FoodCategory {
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
    date: String!
    name: String!
    caloriesBurned: Int!
    user: User!
  }

  input ExerciseEntryInput {
    date: String!
    name: String!
    caloriesBurned: Int!
    user: Int!
  }
`;
