const Foods = require("../../models/foodsModel");
const FoodEntry = require('../../models/foodEntriesModel');
const FoodCategory = require('../../models/foodCategoriesModel');

module.exports = {
  Query: {
    getFoods: async (root, args, ctx) => {
      const foods = await Foods.getAll();
      return foods;
    },
    getFoodById: async (root, args, ctx) => {
      const food = await Foods.findById(args.foodId);
      return food;
    }
  },

  Food: {
    food_category_id: async (root, args,ctx, info) => {
      const foodCategory = await FoodCategory.findById(root.food_category_id)
      return foodCategory;
    },
    foodEntries: async (root,args,cxt,info) => {
      const foodEntries = await FoodEntry.findBy({food_id: root.id});
      return foodEntries;
    }
  },

  Mutation: {
    addFood: async (root, args, ctx) => {
      const food = await Foods.add(args.input);
      console.log(food)
      return food;
    },

    deleteFood: async (root, args, ctx) => {
      const count = await Foods.remove(args.id);
      return count;
    },

    updateFood: async (root, args, ctx) => {
      const food = await Foods.edit(args.id, args.input);
      return food;
    }
  }
};
