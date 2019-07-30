const { AuthenticationError } = require("apollo-server");

const WeightEntry = require("../../models/weightEntriesModel");
const User = require("../../models/usersModel");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getWeightEntries: async (root, args, ctx) => {
      const weightEntries = await WeightEntry.getAll();
      return weightEntries;
    },

    getWeightEntriesByUserId: async (root, args, ctx) => {
      const weightEntry = await WeightEntry.findBy({ user_id: args.userId });
      return weightEntry;
    }
  },

  WeightEntry: {
    user_id: async (root, args, ctx) => {
      const owner = await User.findById(root.user_id);
      return owner;
    }
  },

  Mutation: {
    addWeightEntry: async (root, args, ctx) => {
      const newWeightEntry = {
        ...args.input
      };
      try {
        const addedEntry = await WeightEntry.add(newWeightEntry);
        return addedEntry;
      } catch (err) {
        console.log(err);
      }
    },

    updateWeightEntry: async (root, args, ctx) => {
      const { id, input } = args;
      const weightEntry = await WeightEntry.edit(id, input);
      return weightEntry;
    },

    deleteWeightEntry: async (root, { id }, ctx) => {
      const deleteEntry = await WeightEntry.remove(id);
      return deleteEntry;
    }
  }
};
