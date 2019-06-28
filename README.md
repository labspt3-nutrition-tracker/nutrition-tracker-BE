# Nutrition Tracker Backend Documentation

## Table of Contents

* [Nutrition Tracker API](#Nutrition-Tracker-API)
* [Covered Use Cases](#Covered-Use-Cases)
* [Technologies](#Technologies)
* [Setup](#Setup)
* [User Model](#User-Model)
    * [User Queries](#User---Queries)
    * [User Mutations](#User---Mutations)
* [Food Model](#Food-Model)
    * [Food Queries](#Food---Queries)
    * [Food Mutations](#Food---Mutations)
* [Meal Category Model](#Meal-Category-Model)
    * [Meal Category Queries](#Meal-Category---Queries)
* [Food Entry Model](#Food-Entry-Model)
    * [Food Entry Queries](#Food-Entry---Queries)
    * [Food Entry Mutations](#Food-Entry---Mutations)
* [Exercise Entry Model](#Exercise-Entry-Model)
    * [Exercise Entry Queries](#Exercise-Entry---Queries)
    * [Exercise Entry Mutations](#Exercise-Entry---Mutations)
* [Weight Entry Model](#Weight-Entry-Model)
    * [Weight Entry Queries](#Weight-Entry---Queries)
    * [Weight Entry Mutations](#Weight-Entry---Mutations)
* [Coaches Model](#Coaches-Model)
    * [Coaches Queries](#Coaches---Queries)
    * [Coaches Mutations](#Coaches---Mutations)
* [Messages Model](#Messages-Model)
    * [Messages Queries](#Messages---Queries)
    * [Messages Mutations](#Messages---Mutations)
* [License](#License)


## Nutrition Tracker API
This API covers all key use cases related to the nutrition tracker. The API uses [Graph QL](https://graphql.org/) which is a query language for APIs and it gives users the ability to query exactly what is needed and nothing more.

As of now, using Nutrition Tracker API can only be used in conjunction with [Google's Oauth2 API](https://developers.google.com/identity/protocols/OAuth2) as it is used to check for a verified and active Token upon logging in for the front end.

#### Covered Use Cases

  * Creating, Updating, Reading
    * users
  * Full CRUD functionality for
    * foods
    * foodEntries
    * messages
    * exerciseEntries
    * weightentries
  * Create, Read, and Delete
    * coaches
    * billing
  * Read functionality for
    * mealCategories

 > Using the API for the front end requires a check using Google's  Oauth2 Client API. This would check against the user info and would result in an active token to be used in the headers

## Technologies

Project is created with:
  * Apollo Server version: 2.5.0
  * dotenv version: 8.0.0
  * google-auth-library version: 4.0.0
  * graphql version: 14.3.0
  * graphql-merge-resolvers version: 1.1.10
  * knex version: 0.17.6
  * pg version: 7.11.0
  * sqlite3 version: 4.0.8
  * strip version: 7.1.0

## Setup

To run this project, install it locally using yarn:

    $ cd nutrition-tracker-BE/
    $ yarn install
    $ yarn start

Or to use an already existing API to get started:

[Nutrition Tracker](https://nutrition-tracker-be.herokuapp.com/)


## User Model

  The following are the data that can be returned in User Model Queries:

  > * id
  > * firstName
  > * lastName
  > * username
  > * email
  > * userType
  > * calorieGoal
  > * weight
  > * foodEntries - uses foodEntries model
  > * exerciseEntries - uses exerciseEntries model
  > * stripe_id
  > * trainees


### **User - Queries**

#### getCurrentUser: this query requires an object in the HTTP header with the following key value pairs.

  > { "authorization": "THE_GOOGLE_TOKEN_GENERATED"}

  The following is an example of a getCurrentUser query:

  <p align="center">
    <img alt="getCurrentUser query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getCurrentUser.png">
  </p>

#### getUsers: this query returns every user from the API

  The following is an example of a getUsers query:

  <p align="center">
    <img alt="getUsers query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getUsers.png"?
  </p>

#### getUserBy: this query uses two arguments to check the API for a user that has that specific param - value match.
    1) param: a column from the User model
    2) value: a String value

  The following is an example of a getUserBy query:

  <p align="center">
    <img alt="getUserBy query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getUserBy.png"
  </p>

#### getUserById: this query uses a userId argument to query a user with that specific id.

  The following is an example of a getUserById query:

  <p align="center">
    <img alt="getUserById query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getUserById.png"
  </p>

#### getFoodEntriesByUserId: this query uses a userId argument to query all the food that belongs to that specific userId.

  The following is an example of a getFoodEntriesByUserId query:

  > Note: This query uses the FoodEntries Model which will be mentioned in a further section

  <p align="center">
    <img alt="getFoodEntriesByUserId query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getFoodEntriesByUserId.png"
  </p>

#### getExerciseEntriesByUserId: this query uses a userId argument to query all the exercise activities that belongs to that specific userId.

  The following is an example of a getExerciseEntriesByUserId query:

  > Note: This query uses the ExerciseEntries Model which will be mentioned in a further section

  <p align="center">
    <img alt="getExerciseEntriesByUserId query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getExerciseEntriesByUserId%20.png"
  </p>

### **User - Mutations**

#### addUser: this mutation inserts a user into users table in the API

  > Note: It uses the following arguments wrapped in an input object with all being mandatory except for the weight

      firstName: String!
      lastName: String!
      username: String!
      email: String!
      userType: String!
      calorieGoal: Int!
      weight: Int

  The following is an example of a addUser mutation:

  <p align="center">
    <img alt="getExerciseEntriesByUserId mutation"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/addUser.png"
  </p>

#### updateUser: this mutation edits an existing user entry in the API. Like the addUser, it requires the same mandatory arguments. Only weight is optional

  It differs in that it has two main argument:

    1) id
    2) input object - The same input from addUser

  The following is an example of an updateUser mutation:

  <p align="center">
    <img alt="getExerciseEntriesByUserId mutation"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/updateUser.png"
  </p>

#### deleteUser: this mutation deletes a user from the API

  It contains only the id argument and requires no output as it returns a 1 for successful deletion and  0 for unsuccessful deletions.

  The following is an example of a deleteUser mutation:

  <p align="center">
    <img alt="getExerciseEntriesByUserId mutation"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/deleteUser.png"
  </p>

## Food Model

  The following are the data that can be returned in Food Model Queries:

   * id
   * foodName
   * caloriesPerServ
   * fats
   * carbs
   * proteins
   * edamam_id
   * foodEntries - uses foodEntries model

### **Food - Queries**

#### getFoods: this query gets all the existing Foods in the database

  The following is an example of a getFoods query:

  <p align="center">
    <img alt="getFoods query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/FoodImages/getFoods.png">
  </p>

#### getFoodById: this query gets a Food object using it's id

  The following is an example of a getFoodById query:

  <p align="center">
    <img alt="getFoodbyId query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/FoodImages/getFoodById.png">
  </p>

### **Food - Mutations**

#### addFood: this mutation inserts a food object into the foods table

  > Note: It uses the following arguments wrapped in an input object with all being mandatory except for edamam_id

      foodName: String!
      caloriesPerServ: Int!
      fats: Float!
      carbs: Float!
      proteins: Float!
      edamam_id: String

  The following is an example of an addFood mutation

  <p align="center">
    <img alt="addFood mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/FoodImages/addFood.png">
  </p>

#### updateFood: this mutation edits an existing food object entry using two arguments. Like addFood, it uses the same mandatory arguments.

  It differs in that it has two main argument:

    1) id
    2) input object - The same input from addFood

  The following is an example of an updateFood mutation  

  <p align="center">
    <img alt="updateFood mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/FoodImages/updateFood.png">
  </p>

#### deleteFood: this mutation deletes a food object from the API

  It contains only the id argument and requires no output as it returns a 1 for successful deletion and  0 for unsuccessful deletions.

  The following is an example of a deleteFood mutation:

  <p align="center">
    <img alt="deleteFood mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/FoodImages/deleteFood.png">
  </p>

## Meal Category Model

  Due to executive decisions, we've decided remove update, edit, and delete of meal categories in order to simplify meals into 4 categories.

    1) id: 1, mealCategoryName: Breakfast  
    2) id: 2, mealCategoryName: Lunch
    3) id: 3, mealCategoryName: Snack
    4) id: 4, mealCategoryName: Dinner

  The following are the data that can be returned in Meal Category Model Queries:

  * id
  * mealCategoryName
  * foodEntries -uses foodEntry Model


### **Meal Category - Queries**

#### getMealCategories: this query gets all of the existing mealCateogries in the API

  The following is an example of a getMealCategories query:

  <p align="center">
    <img alt="getMealCategories query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/MealCategoryImages/getMealCategory.png">
  </p>

#### getMealCategoryBy: this query uses two arguments to check the API for a mealCategory that has that specific param - value match.

    1) param: a column from the User model
    2) value: a String value

  The following is an example of a getMealCategoryBy query:

  <p align="center">
    <img alt="getMealCategoryBy query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/MealCategoryImages/getMealCategoryBy.png"
  </p>

#### getMealCategoryById: this query uses an meal category's id as an argument to query a meal category with that specific id.

  The following is an example of a getMealCategoryById query:

  <p align="center">
    <img alt="getMealCategoryById query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/MealCategoryImages/getMealCategoryById.png"
  </p>

## Food Entry Model

  The following are the data that can be returned in FoodEntry Model Queries:

   * id  
   * date
   * food_id - can return food model data     
   * user_id - can return user model data
   * servingQty
   * meal_category_id - can return meal category model data


### **Food Entry - Queries**

#### getFoodEntries: this query is used to get all the foodEntries in the API

  The following is an example of a getFoodEntries query:

  <p align="center">
    <img alt="getFoodentries query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/FoodEntries/getFoodEntries.png"
  </p>

#### getFoodEntriesById: this query uses the foodEntries' id and gets a Food entry object using it's id

  The following is an example of a getFoodEntriesById query:

  <p align="center">
    <img alt="getFoodEntriesById query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/FoodEntries/getFoodEntries_ById.png">
  </p>  

### **Food Entry - Mutations**  

#### addFoodEntry: this mutation inserts a food entry object into the foodEntries table

> Note: It uses the following arguments wrapped in an input object with all being mandatory

      date: Date!
      food_id: ID!
      user_id: ID!
      servingQty: Int!
      meal_category_id: ID!

  The following is an example of an addFoodEntry mutation

  <p align="center">
    <img alt="addFoodEntry mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/FoodEntries/addFoodEntry.png">
  </p>


#### updateFoodEntry: this mutation edits an existing food entry object entry using two arguments. Like addFoodEntry, it uses the same mandatory arguments in input.

  It differs in that it has two main argument:

    1) id
    2) input object - The same input from addFoodEntry

  The following is an example of an updateFoodEntry mutation  

  <p align="center">
    <img alt="updateFoodEntry mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/FoodEntries/updateFoodEntry.png">
  </p>

#### deleteFoodEntry: this mutation deletes a food entry object from the API

  It contains only the id argument and requires no output as it returns a 1 for successful deletion and  0 for unsuccessful deletions.

  The following is an example of a deleteFoodEntry mutation:

  <p align="center">
    <img alt="deleteFoodEntry mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/FoodEntries/deleteFoodentry.png">
  </p>


## Exercise Entry Model

  The following are the data that can be returned in Exercise Model Queries:

  * id
  * exerciseEntryDate
  * exerciseName
  * caloriesBurned
  * exercise_entry_user_id - uses the User Model

### **Exercise Entry - Queries**

#### getExerciseEntries: this query returns every exercise entries from the API

  The following is an example of a getExerciseEntries query:

  <p align="center">
    <img alt="getExerciseEntries query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/ExerciseEntryImages/getExerciseEntries.png"?
  </p>

#### getExerciseEntryBy: this query uses two arguments to check the API for an exercise entry that has that specific param - value match.

    1) param: a column from the exercise entry model
    2) value: a String value

  The following is an example of a getExerciseEntryBy query:

  <p align="center">
    <img alt="getExerciseEntryBy query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/ExerciseEntryImages/getExerciseEntryBy.png"
  </p>

#### getExerciseEntryById: this query uses an exercise entry id argument to query an exercise entry with that specific id.

  The following is an example of a getExerciseEntryById query:

  <p align="center">
    <img alt="getExerciseEntryById query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/ExerciseEntryImages/getExerciseEntryById.png"
  </p>


### **Exercise Entry - Mutations**

#### addExerciseEntry: this mutation inserts an exercise entry object into the exerciseEntries table

> Note: It uses the following arguments wrapped in an input object with all being mandatory

    exerciseEntryDate: Date!
    exerciseName: String!
    caloriesBurned: Int!
    exercise_entry_user_id: ID!

  The following is an example of an addExerciseEntry mutation

  <p align="center">
    <img alt="addExerciseEntry mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/ExerciseEntryImages/addExerciseEntry.png">
  </p>


#### updateExerciseEntry: this mutation edits an existing exercise entry object entry using two arguments. Like addExerciseEntry, it uses the same mandatory arguments in input.

  It differs in that it has two main argument:

    1) id
    2) input object - The same input from addExerciseEntry

  The following is an example of an updateExerciseEntry mutation  

  <p align="center">
    <img alt="updateExerciseEntry mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/ExerciseEntryImages/updateExercise.png">
  </p>

#### deleteExerciseEntry: this mutation deletes an exercise entry object from the API

  It contains only the id argument and requires no output as it returns a 1 for successful deletion and  0 for unsuccessful deletions.

  The following is an example of a deleteExerciseEntry mutation:

  <p align="center">
    <img alt="deleteExerciseEntry mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/ExerciseEntryImages/deleteExerciseEntry.png">
  </p>

## Weight Entry Model

The following are the data that can be returned in weightEntry Model Queries:

   * id  
   * date
   * weight
   * user_id - This uses the user model data

### **Weight Entry - Queries**

#### getWeightEntries: this query returns every weight entries from the API

  The following is an example of a getWeightEntries query:

  <p align="center">
    <img alt="getWeightEntries" query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/WeightEntriesImages/getWeightEntries.png"?
  </p>

#### getWeightEntriesByUserId: this query uses a userId as an argument in order to get all the weight entries made by that user.

  The following is an example of a getWeightEntriesByUserId query:

  <p align="center">
    <img alt="getWeightEntriesByUserId query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/WeightEntriesImages/getWeightEntriesByUserId.png"
  </p>   

### **Weight Entry - Mutations**

#### addWeightEntry: this mutation inserts an exercise entry object into the weightEntries table

> Note: It uses the following arguments wrapped in an input object with all being mandatory

      date: Date!
      weight: Float!
      user_id: ID!

  The following is an example of an addWeightEntry mutation

  <p align="center">
    <img alt="addWeightEntry mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/WeightEntriesImages/addWeightEntry.png">
  </p>


#### updateWeightEntry: this mutation edits an existing weight entry object entry using two arguments. Like addWeightEntry, it uses the same mandatory arguments in input.

  It differs in that it has two main argument:

      1) id
      2) input object - The same input from addWeightEntry

  The following is an example of an updateWeightEntry mutation  

  <p align="center">
    <img alt="updateWeightEntry mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/WeightEntriesImages/updateWeightEntry.png">
  </p>

#### deleteWeightEntry: this mutation deletes an weight entry object from the API

  It contains only the id argument and requires no output as it returns a 1 for successful deletion and  0 for unsuccessful deletions.

  The following is an example of a deleteWeightEntry mutation:

  <p align="center">
    <img alt="deleteWeightEntry mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/WeightEntriesImages/deleteWeightEntry.png">
  </p>

## Coaches Model

The following are the data that can be returned in Exercise Model Queries:  

> Note: The coaches model uses the User model for both its coach and trainee data. It's a purely relational table.

  * id
  * foodName
  * caloriesPerServ
  * fats
  * carbs
  * proteins
  * edamam_id
  * foodEntries - uses foodEntries model

### **Coaches - Queries**

#### getTrainees: this query uses a coach_id as an argument in order to get a list of that coach's trainees.

The following is an example of a getTrainees query:

<p align="center">
  <img alt="getTrainees query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/CoachesImages/getTrainees.png"
</p>

#### getCoaches: this query uses a trainee_id as an argument in order to get a list of that trainee's coach(es).

The following is an example of a getCoaches query:

<p align="center">
  <img alt="getCoaches query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/CoachesImages/getcoaches.png"
</p>

### **Coaches - Mutations**

> Note: As the coaches table is a relational table, it's arguments are coach_id and trainee_id only. The result of both the addTrainees and deleteTrainees are the same data coming off a user model.

#### addTrainees: this mutation uses coach_id and trainee_id in that order in order to add a trainee to the coach's list of trainees.

The following is an example of an addTrainees mutation:

<p align="center">
  <img alt="addTrainees mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/CoachesImages/addTrainees.png"
</p>

#### deleteTrainees: this mutation uses coach_id and trainee_id in that order in order to delete that trainee from the coach's list of trainees.

The following is an example of an deleteTrainees mutation:

<p align="center">
  <img alt="deleteTrainees mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/CoachesImages/deleteTrainees.png"
</p>

## Messages Model

The following are the data that can be returned in Messages Model Queries:

  * id: ID!
  * created_at: Date!
  * type: String!
  * text: String!
  * read: Boolean!
  * sender: User!
  * recipient: User!

### **Messages - Queries**

#### getMessagesBy: this query uses two arguments to query message(s) based on the param (the table columns), and the value: the value of the column. It returns objects that matches the param: value

The following is an example of an getMessagesBy query:

<p align="center">
  <img alt="getMessagesBy query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/MessagesImages/getMessageBy.png"
</p>

### **Messages - Mutations**

#### addMessage: this mutation inserts an message object into the messages table

> Note: It uses the following arguments wrapped in an input object with all being mandatory

      type: String!
      text: String!
      read: Boolean!
      sender: ID!
      recipient: ID!

The following is an example of an addMessage mutation

<p align="center">
  <img alt="addMessage mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/MessagesImages/addMessage.png">
</p>


#### updateMessage: this mutation edits an existing message entry object entry using two arguments. Like addMessage, it uses the same mandatory arguments in input.

  It differs in that it has two main argument:

      1) id
      2) input object - The same input from addMessage mutation

  The following is an example of an updateMessage mutation  

  <p align="center">
    <img alt="updateMessage mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/MessagesImages/updateMessage.png">
  </p>

#### deleteMessage: this mutation deletes an message object from the API

  It contains only the id argument and requires no output as it returns a 1 for successful deletion and  0 for unsuccessful deletions.

  The following is an example of a deleteMessage mutation:

  <p align="center">
    <img alt="deleteMessage mutation" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/MessagesImages/deleteMessage.png">
  </p>

## License

> You can check the full license [here](https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/master/LICENSE)

This project is licensed under the terms of the MIT license
