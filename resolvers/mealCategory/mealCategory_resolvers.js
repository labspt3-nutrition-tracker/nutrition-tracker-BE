//* Import MealCategory helper functions
const MealCategory = require("../../models/mealCategoriesModel");
const FoodEntry = require("../../models/foodEntriesModel");
/*
in typeDefs:
  type Mutation {
    addMealCategory(input: MealCategoryInput!): MealCategory!
    updateMealCategory(id: ID!, input: UpdateMealCategoryInput!): MealCategory!
    deleteMealCategory(id: ID!): Int!
  }
  type MealCategoryInput {
    id: ID!
    name: String!
  }
  type UpdateMealCategoryInput {
    id: ID
    name: String
  }
*/
module.exports = {
  Query: {
    getMealCategories: async (root, args, ctx) => {
      const categories = await MealCategory.getAll();
      return categories;
    },

    getMealCategoryBy: async (root, args, ctx) => {
      const category = await MealCategory.findBy({ [args.filter]: args.value });
      return category;
    },

    getMealCategoryById: async (root, args, ctx) => {
      const category = await MealCategory.findById(args.id);
      return category;
    }
  },

  MealCategory: {
    foodEntries: async (root, args, ctx, info) => {
      const entries = await FoodEntry.findBy({ meal_category_id: root.id });
      return entries;
    }
  },

  Mutation: {
    addMealCategory: async (root, args, ctx) => {
      const newCategory = await MealCategory.add(args.input);
      return newCategory;
    },

    updateMealCategory: async (root, args, ctx) => {
      const category = await MealCategory.edit(args.id, args.input);
      return category;
    },

    deleteMealCategory: async (root, args, ctx) => {
      const deletedCount = await MealCategory.remove(args.id);
      return deletedCount;
    }
  }
};
