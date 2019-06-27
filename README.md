# Nutrition Tracker Backend Documentation

## Nutrition Tracker API
This API covers all key use cases related to the nutrition tracker. The API uses [Graph QL](https://graphql.org/) which is a query language for APIs and it gives users the ability to query exactly what is needed and nothing more.

As of now, Nutrition Tracker can only be used in conjunction with [Google's Oauth2 API](https://developers.google.com/identity/protocols/OAuth2) as it is used to check for a verified and active Token upon logging in.

#### Covered Use Cases

  * Creating, Updating, Reading Users,
  * Full CRUD functionality for Food, FoodEntry, MealCategory,  Messages, ExerciseEntry, Weight
  * Create, Read, and Delete Coaches and Strip Subscriptions
