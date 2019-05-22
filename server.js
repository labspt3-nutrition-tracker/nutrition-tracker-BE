const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");

const { findOrCreateUser } = require("./controllers/userController");

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
