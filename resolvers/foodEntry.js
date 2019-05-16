const { AuthenticationError } = require('apollo-server');

const FoodEntry = requrie('../../models/foodEntriesModel');

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser){
    throw new AuthenticationError("You must be logged in!");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {

    getFoodEntries: async(root, args, ctx) => {
      const foodEntries = await FoodEntry.getAll();
      return foodEntries;
    },

    getFoodEntriesById: async(root,args, ctx) => {
      const foodEntry = await FoodEntry.findById(args.id);
      return foodEntry;
    },
    FoodEntry: async {
      user(root,args,ctx){
        const owner = await FoodEntry.findBy({user_id: root.id})
        return owner;
      },
      food(root,args,ctx){
        const loggedFood = await FoodEntry.findBy({food_id: root.id})
        return loggedFood
      },
      mealCategory(root, args, ctx){
        const mealCat = await FoodEntry.findBy({meal_category_id: root.id})
      }
    }
  },

  Mutation: {
    addFoodEntry: async(root,args,ctx) => {
      const newFoodEntry = {
      ...args
      }
      const addedEntry = await FoodEntry.add(newFoodEntry);
      return(addedEntry);
    },

    updateFoodEntry: async(root, args, ctx) => {
      const { id, data } = args
      const foodEntry = await FoodEntry.edit(id, data)
      return foodEntry;
    },

    deleteFoodentry: async(root, {id}, ctx) => {
      const deleteEntry = await FoodEntry.remove(id)
      return deleteEntry;
    }
  }
}
