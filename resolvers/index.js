const GMR = require("graphql-merge-resolvers");

const stripeResolver = require("./stripe/stripeResolvers");
const exerciseResolver = require("./exerciseEntry/exerciseEntry_resolvers");
const foodResolver = require("./foods/foodsResolvers");
const mealCatResolver = require("./mealCategory/mealCategory_resolvers");
const userResolver = require("./users/usersResolvers");
const foodEntryResolver = require("./foodEntry/foodEntry");
const dateResolver = require("./date/dateResolvers");
const weightEntryResolver = require("./weightEntry/weightEntry");
const messageResolver = require("./message/messageResolver");
const coachesResolver = require("./coach/coachesResolvers");

module.exports = GMR.merge([
  userResolver,
  exerciseResolver,
  mealCatResolver,
  foodResolver,
  foodEntryResolver,
  dateResolver,
  weightEntryResolver,
  stripeResolver,
  messageResolver,
  coachesResolver
]);
