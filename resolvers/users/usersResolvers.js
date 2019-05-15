const { AuthenticationError } = require("apollo-server");

const User = require("../../models/usersModel");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    // Add in typeDefs.js
    // type Query {
    //   getCurrentUser: User
    //   getUsers: [User]
    // }

    getCurrentUser: authenticated((root, args, ctx) => ctx.currentUser),

    getUsers: async (root, args, ctx) => {
      const users = await User.getAll();
      return users;
    }
  }
};
