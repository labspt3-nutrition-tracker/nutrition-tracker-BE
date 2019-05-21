const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");
// const resolvers = require("./resolvers/index");
const { findOrCreateUser } = require("./controllers/userController");

//* import resolvers
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
