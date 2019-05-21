const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    #//*ExerciseEntry
    getExerciseEntries: [ExerciseEntry!]!
    getExerciseEntryBy(filter: String!): ExerciseEntry!
    getExerciseEntryById(id: ID!): ExerciseEntry!

    #//*Food
    getFoods: [Food!]!
    getFoodById(foodId: ID!): Food!

    #//*MealCategory
    getMealCategories: [MealCategory!]!
    getMealCategoryBy(filter: String!): MealCategory!
    getMealCategoryById(id: ID!): MealCategory!

    #//*User
    getCurrentUser: User
    getUsers: [User!]!
    getUserBy(filter: String!): User!
    getUserById(userId: ID!): User
    getFoodEntriesByUserId(userId: ID!): FoodEntry!
    getExerciseEntriesByUserId(userId: ID!): ExerciseEntry!

    #//*FoodCategory
    getFoodCategories: [FoodCategory!]!
    getFoodCategoryById(id: ID!): FoodCategory!

    #//* FoodEntry
    getFoodEntries: [FoodEntry!]!
    getFoodEntriesById(id: ID!): FoodEntry!
  }

  type Mutation {
    #//* ExerciseEntry
    addExerciseEntry(newEntry: ExerciseEntryInput!): ExerciseEntry!
    updateExerciseEntry(id: ID!, changes: ExerciseEntryInput!): ExerciseEntry!
    deleteExerciseEntry(id: ID!): Int!

    #//* Food
    addFood(food: FoodInput!): Food!
    updateFood(foodId: ID!, food: FoodInput!): Food!
    deleteFood(foodId: ID!): Int!

    #//*MealCategory
    addMealCategory(newCategory: MealCategoryInput!): MealCategory!
    updateMealCategory(id: ID!, changes: MealCategoryInput!): MealCategory!
    deleteMealCategory(id: ID!): Int!

    #//*User
    addUser(input: UserInput!): User!
    deleteUser(userId: ID!): Int!
    updateUser(userId: ID!, user: UserInput!): User!

    #//*FoodCategory
    addFoodCategory(newFoodCategory: FoodCategoryInput!): FoodCategory!
    updateFoodCategory(id: ID!, data: FoodCategoryInput!): FoodCategory!
    deleteFoodCategory(id: ID!): Int!

    #//*FoodEntry
    addFoodEntry(newFoodEntry: FoodEntryInput!): FoodEntry!
    updateFoodEntry(id: ID!, data: FoodEntryInput!): FoodEntry!
    deleteFoodentry(id: ID!): Int!
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
    foodName: String!
    caloriesPerServ: Int!
    food_category_id: FoodCategory!
    foodEntries: [FoodEntry!]!
  }

  type FoodEntry {
    id: ID!
    date: String!
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
    exerciseEntryDate: String!
    exerciseName: String!
    caloriesBurned: Int!
    exercise_entry_user_id: User!
  }

  input ExerciseEntryInput {
    exerciseEntryDate: String!
    exerciseName: String!
    caloriesBurned: Int!
    exercise_entry_user_id: ID!
  }

  input FoodInput {
    name: String!
    caloriesPerServ: Int!
    category: ID!
  }

  input MealCategoryInput {
    name: String!
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
    date: String!
    food_id: ID!
    user_id: ID!
    servingQty: Int!
    meal_category_id: ID!
  }
`;
