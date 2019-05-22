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
    getCurrentUser: authenticated((root, args, ctx) => ctx.currentUser),

    getUsers: async (root, args, ctx) => {
      const users = await User.getAll();
      return users;
    },

    getUserById: async (root, args, ctx) => {
      const user = await User.findById(args.userId);
      return user;
    },

    getUserBy: async (root, args, ctx) => {
      const user = await User.findBy(args.filter);
      console.log({ user });
      return user;
    },

    getFoodEntriesByUserId: async (root, args, ctx) => {
      const entries = await FoodEntry.findBy({ user_id: args.userId });
      return entries;
    },

    getExerciseEntriesByUserId: async (root, args, ctx) => {
      const entries = await ExerciseEntry.findBy({ user_id: args.userId });
      return entries;
    }
  },

  User: {
    exerciseEntries: async (root, args, ctx, info) => {
      const entries = await ExerciseEntry.findBy({ exercise_entry_user_id: root.id });
      return entries;
    },
    foodEntries: async (root, args, ctx, info) => {
      const entries = await FoodEntry.findBy({ user_id: root.id });
      return entries;
    }
  },

  Mutation: {
    addUser: async (root, args, ctx) => {
      const newUSer = await User.add(args.input);
      return newUSer;
    },
    deleteUser: async (root, args, ctx) => {
      const count = await User.remove(args.id);
      return count;
    },
    updateUser: async (root, args, ctx) => {
      const user = await User.edit(args.id, args.input);
      return user;
    }
  }
};
