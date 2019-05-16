//* Import MealCategory helper functions
const MealCategory = require("../../models/mealCategoriesModel");

module.exports = {
  Query: {
    getMealCategories: async (root, args, ctx) => {
      const categories = await MealCategory.getAll();
      return categories;
    },

    getMealCategoryBy: async (root, args, ctx) => {
      const category = await MealCategory.findBy(args.filter);
      return category;
    },

    getMealCategoryById: async (root, args, ctx) => {
      const category = await MealCategory.findById(args.id);
      return category;
    }
  }
};
