const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    #//*ExerciseEntry
    getExerciseEntries: [ExerciseEntry!]!
    getExerciseEntryBy(param: String!, value: String!): [ExerciseEntry!]!
    getExerciseEntryById(id: ID!): ExerciseEntry!

    #//*Food
    getFoods: [Food!]!
    getFoodById(foodId: ID!): Food!

    #//*MealCategory
    getMealCategories: [MealCategory!]!
    getMealCategoryBy(param: String!, value: String!): MealCategory!
    getMealCategoryById(id: ID!): MealCategory!

    #//*User
    getCurrentUser: User
    getUsers: [User!]!
    getUserBy(param: String!, value: String!): User
    getUserById(userId: ID!): User
    getFoodEntriesByUserId(userId: ID!): [FoodEntry!]!
    getExerciseEntriesByUserId(userId: ID!): [ExerciseEntry]!

    #//*FoodCategory
    getFoodCategories: [FoodCategory!]!
    getFoodCategoryById(id: ID!): FoodCategory!

    #//* FoodEntry
    getFoodEntries: [FoodEntry!]!
    getFoodEntriesById(id: ID!): FoodEntry!

    #//* Billing
    getBillingHistory(id: ID!): Billing!
  }

  type Mutation {
    #//* ExerciseEntry
    addExerciseEntry(input: ExerciseEntryInput!): ExerciseEntry!
    updateExerciseEntry(id: ID!, input: ExerciseEntryInput!): ExerciseEntry!
    deleteExerciseEntry(id: ID!): Int!

    #//* Food
    addFood(input: FoodInput!): Food!
    updateFood(id: ID!, input: FoodInput!): Food!
    deleteFood(id: ID!): Int!

    #//*MealCategory
    addMealCategory(input: MealCategoryInput!): MealCategory!
    updateMealCategory(id: ID!, input: MealCategoryInput!): MealCategory!
    deleteMealCategory(id: ID!): Int!

    #//*User
    addUser(input: UserInput!): User!
    deleteUser(id: ID!): Int!
    updateUser(id: ID!, input: UserInput!): User!

    #//*FoodCategory
    addFoodCategory(input: FoodCategoryInput!): FoodCategory!
    updateFoodCategory(id: ID!, input: FoodCategoryInput!): FoodCategory!
    deleteFoodCategory(id: ID!): Int!

    #//*FoodEntry
    addFoodEntry(input: FoodEntryInput!): FoodEntry!
    updateFoodEntry(id: ID!, input: FoodEntryInput!): FoodEntry!
    deleteFoodentry(id: ID!): Int!

    #//*Billing
    createSubscription(source: String!, email: String!): User!
  }

  scalar Date

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
    stripe_id: String
  }

  type Food {
    id: ID!
    foodName: String!
    caloriesPerServ: Int!
    fats: Float!
    carbs: Float!
    proteins: Float!
    foodEntries: [FoodEntry!]!
  }

  type FoodEntry {
    id: ID!
    date: Date!
    food_id: Food!
    user_id: User!
    servingQty: Int!
    meal_category_id: MealCategory!
  }

  type FoodCategory {
    id: ID!
    foodCategoryName: String!
    foods: [Food!]!
  }

  type MealCategory {
    id: ID!
    mealCategoryName: String!
    foodEntries: [FoodEntry!]!
  }

  type ExerciseEntry {
    id: ID!
    exerciseEntryDate: Date!
    exerciseName: String!
    caloriesBurned: Int!
    exercise_entry_user_id: User!
  }

  type Billing {
    id: ID!
    date: Date!
    user_id: User!
    amount_paid: Int!
  }

  input ExerciseEntryInput {
    exerciseEntryDate: Date!
    exerciseName: String!
    caloriesBurned: Int!
    exercise_entry_user_id: ID!
  }

  input FoodInput {
    foodName: String!
    caloriesPerServ: Int!
    fats: Float!
    carbs: Float!
    proteins: Float!
  }

  input MealCategoryInput {
    mealCategoryName: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    userType: String!
    calorieGoal: Int!
    weight: Int
  }

  input FoodCategoryInput {
    foodCategoryName: String!
  }

  input FoodEntryInput {
    date: Date!
    food_id: ID!
    user_id: ID!
    servingQty: Int!
    meal_category_id: ID!
  }
`;
