const { ApolloServer } = require("apollo-server");
const { merge } = require("lodash");

const typeDefs = require("./typeDefs");
// const resolvers = require("./resolvers/index");
// console.log("resolvers from index", resolvers);
const { findOrCreateUser } = require("./controllers/userController");

//* import resolvers
const exerciseResolver = require("./resolvers/exerciseEntry/exerciseEntry_resolvers");
const foodResolver = require("./resolvers/foods/foodsResolvers");
const mealCatResolver = require("./resolvers/mealCategory/mealCategory_resolvers");
const userResolver = require("./resolvers/users/usersResolvers");
const foodCatResolver = require("./resolvers/foodCategory");
const foodEntryResolver = require("./resolvers/foodEntry");

const server = new ApolloServer({
  typeDefs,
  resolvers: merge(
    exerciseResolver,
    foodResolver,
    mealCatResolver,
    userResolver,
    foodCatResolver,
    foodEntryResolver
  ),

  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        // find or create user
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (err) {
      console.error(`Unable to authenticate user with token ${authToken}`);
    }
    return { currentUser };
  }
});

module.exports = server;
