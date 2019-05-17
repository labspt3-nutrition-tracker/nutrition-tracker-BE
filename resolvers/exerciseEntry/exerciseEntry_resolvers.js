//* import ExerciseEntry helper functions
const ExerciseEntry = require("../../models/exerciseEntriesModel");
const Users = require('../../models/usersModel')

module.exports = {
  Query: {
    getExerciseEntries: async (root, args, ctx) => {
      const entries = await ExerciseEntry.getAll();
      console.log(entries);
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
  ExerciseEntry: {
    user: async (root, args, ctx, info) => {
      const user = await Users.findBy({id: root.exercise_entry_user_id})
      console.log("seeing users", user)
      return user
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

  // ExerciseEntry: {
  //   user: async (root, args, ctx) => {
  //     const user = await ExerciseEntry.findBy({ id: root.id });
  //     return user;
  //   }
  // }
};
