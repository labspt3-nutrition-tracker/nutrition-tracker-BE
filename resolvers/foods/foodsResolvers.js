const Foods = require("../../models/foodsModel");

module.exports = {
  Query: {
    // Add in typeDefs.js
    // type Query {
    //   getFoods: [Food]
    //   getFoodById(foodId: ID!): Food
    // }

    getFoods: async (root, args, ctx) => {
      const foods = await Foods.getAll();
      return foods;
    },

    getFoodById: async (root, args, ctx) => {
      const food = await Foods.findById(args.foodId);
      return food;
    }
  },

  Mutation: {
    // Add in typeDefs.js
    // type Mutation {
    //  addFood(food: Food!)
    //  deleteFood(foodId: ID!): Int
    //  updateFood(foodId: ID!, food: Food!): Food
    // }

    addFood: async (root, args, ctx) => {
      const food = await Foods.add(args.food);
      return food;
    },

    deleteFood: async (root, args, ctx) => {
      const count = await Foods.remove(args.foodId);
      return count;
    },

    updateFood: async (root, args, ctx) => {
      const food = await Foods.edit(args.foodId, args.food);
      return food;
    }
  }
};
