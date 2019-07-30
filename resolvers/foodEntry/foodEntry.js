const { AuthenticationError } = require("apollo-server");

const FoodEntry = require("../../models/foodEntriesModel");
const Food = require("../../models/foodsModel");
const MealCategory = require("../../models/mealCategoriesModel");
const User = require("../../models/usersModel");

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getFoodEntries: async (root, args, ctx) => {
      const foodEntries = await FoodEntry.getAll();
      return foodEntries;
    },

    getFoodEntriesById: async (root, args, ctx) => {
      const foodEntry = await FoodEntry.findById(args.id);
      return foodEntry;
    }
  },

  FoodEntry: {
    user_id: async (root, args, ctx) => {
      const owner = await User.findById(root.user_id);
      return owner;
    },
    food_id: async (root, args, ctx) => {
      const loggedFood = await Food.findById(root.food_id);
      return loggedFood;
    },
    meal_category_id: async (root, args, ctx) => {
      const mealCat = await MealCategory.findById(root.meal_category_id);
      return mealCat;
    }
  },

  Mutation: {
    addFoodEntry: async (root, args, ctx) => {
      const newFoodEntry = {
        ...args.input
      };
      const addedEntry = await FoodEntry.add(newFoodEntry);
      return addedEntry;
    },

    updateFoodEntry: async (root, args, ctx) => {
      const { id, input } = args;
      const foodEntry = await FoodEntry.edit(id, input);
      return foodEntry;
    },

    deleteFoodEntry: async (root, { id }, ctx) => {
      const deleteEntry = await FoodEntry.remove(id);
      return deleteEntry;
    }
  }
};
