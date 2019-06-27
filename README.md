# Nutrition Tracker Backend Documentation

## Nutrition Tracker API
This API covers all key use cases related to the nutrition tracker. The API uses [Graph QL](https://graphql.org/) which is a query language for APIs and it gives users the ability to query exactly what is needed and nothing more.

As of now, using Nutrition Tracker API can only be used in conjunction with [Google's Oauth2 API](https://developers.google.com/identity/protocols/OAuth2) as it is used to check for a verified and active Token upon logging in for the front end.

#### Covered Use Cases

  * Creating, Updating, Reading
    * Users
  * Full CRUD functionality for
    * Food
    * FoodEntry
    * MealCategory
    * Messages
    * ExerciseEntry
    * Weight
  * Create, Read, and Delete
    * Coaches
    * Stripe Subscriptions

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
  > * foodEntries
  > * exerciseEntries
  > * stripe_id
  > * trainees


  ### Queries

  #### getCurrentUser: this query requires an object in the HTTP header with the following key value pairs.

  > { "authorization": "THE_GOOGLE_TOKEN_GENERATED"}

  The following is an example of a getCurrentUser query:

  <p align="center">
    <img alt="getCurrentUser query" src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getCurrentUser.png">
  </p>

  #### getUsers: this query returns every user from the database

  The following is an example of a getUsers query:

  <p align="center">
    <img alt="getUsers query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getUsers.png"?
  </p>

  #### getUserBy: this query uses two arguments
  1) param: a column from the User model
  2) value: a String or Int value
   to check the database for a user that has that specific param - value match.

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

  >Note: This query uses the FoodEntries Model which will be mentioned in a further section

  <p align="center">
    <img alt="getFoodEntriesByUserId query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getFoodEntriesByUserId.png"
  </p>

  #### getExerciseEntriesByUserId: this query uses an userId argument to query all the exercise activities that belongs to that specific userId.

  The following is an example of a getExerciseEntriesByUserId query:

    >Note: This query uses the ExerciseEntries Model which will be mentioned in a further section

  <p align="center">
    <img alt="getExerciseEntriesByUserId query"
    src="https://github.com/labspt3-nutrition-tracker/nutrition-tracker-BE/blob/david-chua/Images/UserImages/getExerciseEntriesByUserId%20.png"
  </p>

  As mentioned prior, you can add any of the data you want returned from the User Model.
