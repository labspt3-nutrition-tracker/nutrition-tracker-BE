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
  }
};
