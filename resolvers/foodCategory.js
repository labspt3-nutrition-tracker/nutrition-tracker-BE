const { AuthenticationError } = require("apollo-server");

const FoodCategory = require("../models/foodCategoriesModel");
const Food = require("../models/foodsModel");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getFoodCategories: async (root, args, ctx) => {
      const foodCategories = await FoodCategory.getAll();
      return foodCategories;
    },

    getFoodCategoryById: async (root, args, ctx) => {
      const foodCategory = await FoodCategory.findById(args.id);
      return foodCategory;
    }
  },

  FoodCategory: {
    foods: async (root, args, ctx) => {
      const foods = await Food.findBy({ id: root.id });
      return foods;
    }
  },

  Mutation: {
    addFoodCategory: async (root, args, ctx) => {
      const newFoodCategory = {
        ...args.newFoodCategory
      };
      const addedFoodCategory = await FoodCategory.add(newFoodCategory);
      return addedFoodCategory;
    },

    updateFoodCategory: async (root, args, ctx) => {
      const { id, data } = args;
      const foodCategory = await FoodCategory.edit(id, data);
      return foodCategory;
    },

    deleteFoodCategory: async (root, { id }, ctx) => {
      const deleteFoodCategory = await FoodCategory.remove(id);
      return deleteFoodCategory;
    }
  }
};
