//* import ExerciseEntry helper functions
const ExerciseEntry = require("../../models/exerciseEntriesModel");

module.exports = {
  Query: {
    getExerciseEntries: async (root, args, ctx) => {
      const entries = await ExerciseEntry.getAll();
      return entries;
    },

    getExerciseEntryBy: async (root, args, ctx) => {
      const entry = await ExerciseEntry.findBy(args.filter);
      return entry;
    },

    getExerciseEntryById: async (root, args, ctx) => {
      const entry = await ExerciseEntry.findById(args.id);
      return entry;
    }
  },

  Mutation: {
    addExerciseEntry: async (root, args, ctx) => {
      const newExerciseEntry = await ExerciseEntry.add(args.newEntry);
      return newExerciseEntry;
    },

    updateExerciseEntry: async (root, args, ctx) => {
      const exerciseEntry = await ExerciseEntry.edit(args.id, args.changes);
      return exerciseEntry;
    },

    deleteExerciseEntry: async (root, args, ctx) => {
      const deletedCount = await ExerciseEntry.remove(args.id);
      return deletedCount;
    }
  }
};
