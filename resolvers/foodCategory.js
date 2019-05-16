const { AuthenticationError } = require('apollo-server');

const FoodCategory = requrie('../../models/foodCategoriesModel');

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser){
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    getFoodCategories: async(root, args, ctx) => {
      const foodCategories = await FoodCategory.getAll();
      return foodCategories;
    },

    getFoodEntriesById: async(root,args, ctx) => {
      const foodCategory = await FoodCategory.findById(args.foodEntryID);
      return foodCategory;
    },
    FoodCategory: async {
      food(root, args, ctx) => {
        const foods = await FoodCategory.findBy({id: root.id})
      }
    }

  },

  Mutation: {
    addFoodCategory: async(root,args,ctx) => {
      const newFoodCategory = {
      ...args
      }
      const addedFoodCategory = await FoodCategory.add(newFoodCategory);
      return(addedFoodCategory);
    },

    updateFoodCategory: async(root, args, ctx) => {
      const { id, data } = args
      const foodCategory = await FoodCategory.edit(id, data)
      return foodCategory;
    },

    deleteFoodCategory: async(root, {id}, ctx) => {
      const deleteFoodCategory = await FoodCategory.remove(id)
      return deleteFoodCategory;
    }
  }

}
