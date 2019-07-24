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
    getFoodBy(param: String!, value: String!): [Food]!

    #//*MealCategory
    getMealCategories: [MealCategory!]!
    getMealCategoryBy(param: String!, value: String!): MealCategory!
    getMealCategoryById(id: ID!): MealCategory!

    #//*User
    getCurrentUser: User
    getUsers: [User!]!
    getUserBy(param: String!, value: String!): User
    getUserById(userId: ID!): User
    getFoodEntriesByUserId(userId: ID!): [FoodEntry]!
    getExerciseEntriesByUserId(userId: ID!): [ExerciseEntry]!
    getWeightEntriesByUserId(userId: ID!): [WeightEntry]

    #//*FoodCategory
    getFoodCategories: [FoodCategory!]!
    getFoodCategoryById(id: ID!): FoodCategory!

    #//* FoodEntry
    getFoodEntries: [FoodEntry!]!
    getFoodEntriesById(id: ID!): FoodEntry!

    #//* Billing
    getBillingHistory(id: ID!): [Billing!]
    getRecentBilling(id: ID!): Billing

    #//* Weightentry
    getWeightEntries: [WeightEntry]

    #//* Coaches
    getTrainees(coach_id: ID!): [User!]!
    getCoaches(trainee_id: ID!): [User!]!

    #//* Messages
    getMessagesBy(param: String!, value: String!): [Message]
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
    deleteFoodEntry(id: ID!): Int!

    # //*WeightEntry
    addWeightEntry(input: WeightEntryInput!): WeightEntry!
    updateWeightEntry(id: ID!, input: WeightEntryInput!): WeightEntry!
    deleteWeightEntry(id: ID!): Int!

    #//*Billing
    createSubscription(source: String!, email: String!, amount: Int!): User!

    #//*Messages
    addMessage(input: MessageInput!): Message!
    deleteMessage(id: ID!): Int!
    updateMessage(id: ID!, input: MessageInput!): Message!

    #//*Coaches
    addTrainees(coach_id: ID!, trainee_id: ID!): User!
    deleteTrainees(coach_id: ID!, trainee_id: ID!): Int!
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
    trainees: [Coaches!]!
  }

  type Food {
    id: ID!
    foodName: String!
    caloriesPerServ: Int!
    fats: Float!
    carbs: Float!
    proteins: Float!
    edamam_id: String
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

  type WeightEntry {
    id: ID!
    date: Date!
    weight: Float!
    user_id: User!
  }

  type Billing {
    id: ID!
    date: Date!
    user_id: User!
    amount_paid: Int
  }

  type Coaches {
    coach: User!
    trainee: User!
  }

  type Message {
    id: ID!
    created_at: Date!
    type: String!
    text: String!
    read: Boolean!
    sender: User!
    recipient: User!
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
    edamam_id: String
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
    stripe_id: String
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

  input WeightEntryInput {
    date: Date!
    weight: Float!
    user_id: ID!
  }

  input CoachInput {
    coach_id: ID!
    trainee_id: ID!
  }

  input MessageInput {
    type: String!
    text: String!
    read: Boolean!
    sender: ID!
    recipient: ID!
  }
`;
