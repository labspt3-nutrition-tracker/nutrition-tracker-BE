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

/*
In typeDefs:
type Query: {
  getCurrentUser: User
  getUsers: [User!]!
  getUserById(userId: ID!): User!
  getUserBy(filter: String!, value: String!): [User!]
}
type Mutation: {
  addUser(input: UserInput!): User!
  deleteUser(userId: ID!): Int!
  updateUser(userId: ID!, input: UpdateUserInput!): User!
}
input UserInput {
  firstName: String!
  lastName: String!
  username: String!
  email: String!
  userType: String!
  calorieGoal: Int!
  weight: Int!
}
input UpdateUserInput {
  firstName: String
  lastName: String
  username: String
  email: String
  userType: String
  calorieGoal: Int
  weight: Int
}
*/

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

    getUserBy: async (root, args, ctx) => {
      console.log("in getUserBy ", args);
      const user = await User.findBy({ [args.filter]: args.value });
      console.log({ user });
      return user;
    }

    // getFoodEntries: async (root, args, ctx) => {
    //   const entries = await FoodEntry.findBy({ user_id: args.userId });
    //   return entries;
    // },

    // getExerciseEntries: async (root, args, ctx) => {
    //   const entries = await ExerciseEntry.findBy({ user_id: args.userId });
    //   return entries;
    // }
  },

  User: {
    exerciseEntries: async (root, args, ctx, info) => {
      const entries = await ExerciseEntry.findBy({ exercise_entry_user_id: root.id });
      return entries;
    }
  },

  Mutation: {
    addUser: async (root, args, ctx) => {
      const newUSer = await User.add(args.input);
      return newUSer;
    },
    deleteUser: async (root, args, ctx) => {
      const count = await User.remove(args.userId);
      return count;
    },
    updateUser: async (root, args, ctx) => {
      const user = await User.edit(args.userId, args.input);
      return user;
    }
  }
};
