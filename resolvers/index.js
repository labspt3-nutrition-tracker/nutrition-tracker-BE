const GMR = require("graphql-merge-resolvers");

const stripeResolver = require("./stripe/stripeResolvers");
const exerciseResolver = require("./exerciseEntry/exerciseEntry_resolvers");
const foodResolver = require("./foods/foodsResolvers");
const mealCatResolver = require("./mealCategory/mealCategory_resolvers");
const userResolver = require("./users/usersResolvers");
const foodCatResolver = require("./foodCategory");
const foodEntryResolver = require("./foodEntry/foodEntry");
const dateResolver = require("./dateResolvers");
const weightEntryResolver = require("./weightEntry");
const messageResolver = require("./messageResolver");
const coachesResolver = require("./coach/coachesResolvers");

module.exports = GMR.merge([
  userResolver,
  exerciseResolver,
  foodCatResolver,
  mealCatResolver,
  foodResolver,
  foodEntryResolver,
  dateResolver,
  weightEntryResolver,
  stripeResolver,
  messageResolver,
  coachesResolver
]);
