const exerciseResolver = require("./exerciseEntry/exerciseEntry_resolvers");
const foodResolver = require("./foods/foodsResolvers");
const mealCatResolver = require("./mealCategory/mealCategory_resolvers");
const userResolver = require("./users/usersResolvers");
const foodCatResolver = require("./foodCategory");
const foodEntryResolver = require("./foodEntry");

module.exports = {
  exerciseResolver,
  foodResolver,
  mealCatResolver,
  userResolver,
  foodCatResolver,
  foodEntryResolver
};
