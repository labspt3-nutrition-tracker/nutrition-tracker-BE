const { ApolloServer } = require("apollo-server");
require("dotenv/config");
const typeDefs = require("./typeDefs");

const { authAndFindUser } = require("./controllers/userController");

//* import resolvers
const resolvers = require("./resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        // Authenticate and find user
        currentUser = await authAndFindUser(authToken);
      }
    } catch (err) {
      console.error(`Unable to authenticate user with token ${authToken}`);
    }
    return { currentUser };
  }
});

module.exports = server;
