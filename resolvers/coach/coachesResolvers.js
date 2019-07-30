const { AuthenticationError } = require("apollo-server");

const Coaches = require("../../models/coachesModel");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getTrainees: async (root, args, ctx) => {
      const { coach_id } = args;
      const trainees = await Coaches.getTrainees(coach_id);

      return trainees;
    },
    getCoaches: async (root, args, ctx) => {
      const { trainee_id } = args;
      const coaches = await Coaches.getCoaches(trainee_id);
      return coaches;
    }
  },

  Mutation: {
    addTrainees: async (root, args, ctx) => {
      const { coach_id, trainee_id } = args;
      const trainee = await Coaches.add(coach_id, trainee_id);

      return trainee;
    },

    deleteTrainees: async (root, args, ctx) => {
      const { coach_id, trainee_id } = args;
      const count = await Coaches.remove(coach_id, trainee_id);
      return count;
    }
  }
};
