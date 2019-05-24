//* import ExerciseEntry helper functions
const ExerciseEntry = require("../../models/exerciseEntriesModel");
const Users = require("../../models/usersModel");

module.exports = {
  Query: {
    getExerciseEntries: async (root, args, ctx) => {
      const entries = await ExerciseEntry.getAll();
      return entries;
    },

    getExerciseEntryBy: async (root, args, ctx) => {
      const entry = await ExerciseEntry.findBy({ [args.param]: args.value });
      return entry;
    },

    getExerciseEntryById: async (root, args, ctx) => {
      const entry = await ExerciseEntry.findById(args.id);
      return entry;
    }
  },
  ExerciseEntry: {
    exercise_entry_user_id: async (root, args, cxt, info) => {
      const user = await Users.findById(root.exercise_entry_user_id);
      return user;
    }
  },

  Mutation: {
    addExerciseEntry: async (root, args, ctx) => {
      const newExerciseEntry = await ExerciseEntry.add(args.input);
      return newExerciseEntry;
    },

    updateExerciseEntry: async (root, args, ctx) => {
      const exerciseEntry = await ExerciseEntry.edit(args.id, args.input);
      return exerciseEntry;
    },

    deleteExerciseEntry: async (root, args, ctx) => {
      const deletedCount = await ExerciseEntry.remove(args.id);
      return deletedCount;
    }
  }
};
