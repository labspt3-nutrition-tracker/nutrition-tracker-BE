# Nutrition Tracker Backend Documentation

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

  #### getUserBy: this query uses two arguments
    1) param: a column from the User model
    2) value: a String or Int value
  to check the API for a user that has that specific param - value match.

  The following is an example of a getUserBy query:

  <p align="center">
    <img alt="getUserBy query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getUserBy.png"
  </p>

  #### getUserById: this query uses an userId argument to query a user with that specific id.

  The following is an example of a getUserById query:

  <p align="center">
    <img alt="getUserById query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getUserById.png"
  </p>

  #### getFoodEntriesByUserId: this query uses an userId argument to query all the food that belongs to that specific userId.

  The following is an example of a getFoodEntriesByUserId query:

  > Note: This query uses the FoodEntries Model which will be mentioned in a further section

  <p align="center">
    <img alt="getFoodEntriesByUserId query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getFoodEntriesByUserId.png"
  </p>

  #### getExerciseEntriesByUserId: this query uses an userId argument to query all the exercise activities that belongs to that specific userId.

  The following is an example of a getExerciseEntriesByUserId query:

    > Note: This query uses the ExerciseEntries Model which will be mentioned in a further section

  <p align="center">
    <img alt="getExerciseEntriesByUserId query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getExerciseEntriesByUserId%20.png"
  </p>

  ### **User - Mutations**

  #### addUser: this mutation inserts a user into users table in the API
  > Note: It uses the following arguments wrapped in an input object with all being mandatory except for the weight

  >firstName: String!
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
