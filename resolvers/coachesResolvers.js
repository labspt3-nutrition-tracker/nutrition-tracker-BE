const { AuthenticationError } = require("apollo-server");

const Coaches = require("../../models/coachesModel");
const Users = require("../../models/usersModel");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getTrainees: async (root, args, ctx) => {
       // fill in code
    },
    getCoaches: async (root, args, ctx) => {
       // fill in code
    },
  },

  Mutation: {
    addTrainees: async (root, args, ctx) => {
       // fill in code
    },

    deleteTrainees: async (root, args, ctx) => {
       // fill in code
    },
  }

};
