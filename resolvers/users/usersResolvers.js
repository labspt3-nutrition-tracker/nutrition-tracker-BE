const { AuthenticationError } = require("apollo-server");

const User = require("../../models/usersModel");
const FoodEntry = require("../../models/foodEntriesModel");
const ExerciseEntry = require("../../models/exerciseEntriesModel");

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
    //   getUserById(userId: ID!): User
    //   getFoodEntries(userId: ID!): FoodEntry!
    //   getExerciseEntries(userId: ID!): ExerciseEntry!
    // }

    getCurrentUser: authenticated((root, args, ctx) => ctx.currentUser),

    getUsers: async (root, args, ctx) => {
      const users = await User.getAll();
      return users;
    },

    getUserById: async (root, args, ctx) => {
      const user = await User.findById(args.userId);
      return user;
    },

    getFoodEntries: async (root, args, ctx) => {
      const entries = await FoodEntry.findBy({ user_id: args.userId });
      return entries;
    },

    getExerciseEntries: async (root, args, ctx) => {
      const entries = await ExerciseEntry.findBy({ user_id: args.userId });
      return entries;
    }
  },

  Mutation: {
    // Add in typeDefs.js
    // type Mutation {
    //  deleteUser(userId: ID!): Int
    //  updateUser(userId: ID!, user: User!): User
    // }

    deleteUser: async (root, args, ctx) => {
      const count = await User.remove(args.userId);
      return count;
    },

    updateUser: async (root, args, ctx) => {
      const user = await User.edit(args.userId, args.user);
      return user;
    }
  }
};
