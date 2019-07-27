const request = require("supertest");
const db = require("../../data/dbConfig.js");
const Food = require("../../models/foodsModel");
const MealCategory = require("../../models/mealCategoriesModel");
const User = require("../../models/usersModel");
const FoodEntry = require("../../models/foodEntriesModel");

const server = "http://localhost:4000/";

describe("Environment", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("Food Entries", () => {
  beforeEach(async () => {
    await db("foods").truncate();
    await db("mealCategories").truncate();
    await db("users").truncate();

    await MealCategory.add({ mealCategoryName: "Breakfast" });
    await Food.add({
      foodName: "Apple",
      caloriesPerServ: 57,
      fats: 0.12,
      carbs: 13.68,
      proteins: 0.25
    });
    await User.add({
      firstName: "Leila",
      lastName: "Berrouayel",
      email: "nb.leila10@gmail.com",
      userType: "basic",
      calorieGoal: 1200,
      weight: 170
    });
  });

  describe("Query: Get food entries for specific user", () => {
    beforeEach(async () => {
      await db("foodEntries").truncate();
      await FoodEntry.add({
        date: "07-27-2019",
        food_id: 1,
        user_id: 1,
        servingQty: 1,
        meal_category_id: 1
      });
    });

    it("should return array of food entries", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getFoodEntriesByUserId(userId: 1) {
              id
              date
              servingQty
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getFoodEntriesByUserId).toBeInstanceOf(Array);
      expect(response.body.data.getFoodEntriesByUserId).toHaveLength(1);
    });

    it("should return an empty array if user doesn't exist", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getFoodEntriesByUserId(userId: 2) {
              id
              date
              servingQty
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getFoodEntriesByUserId).toBeInstanceOf(Array);
      expect(response.body.data.getFoodEntriesByUserId).toHaveLength(0);
    });

    it("should return an empty array if no food entries exist for that user", async () => {
      await db("foodEntries").truncate();

      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getFoodEntriesByUserId(userId: 1) {
              id
              date
              servingQty
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getFoodEntriesByUserId).toBeInstanceOf(Array);
      expect(response.body.data.getFoodEntriesByUserId).toHaveLength(0);
    });
  });

  describe("Mutation: Add a food entry", () => {
    beforeEach(async () => {
      await db("foodEntries").truncate();
    });

    it("should add a food entry", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addFoodEntry(input: {
                date: "07-27-2019",
                food_id: 1,
                user_id: 1,
                servingQty: 2,
                meal_category_id: 1
              }) {
                id
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.addFoodEntry.id).toBe("1");
    });

    it("should send an error if missing servingQty to add food entry.", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addFoodEntry(input: {
                date: "07-27-2019",
                food_id: 1,
                user_id: 1,
                meal_category_id: 1
              }) {
                id
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe(
        "Field FoodEntryInput.servingQty of required type Int! was not provided."
      );
      expect(response.status).toBe(400);
    });
  });

  describe("Mutation: Edit a food entry", () => {
    beforeEach(async () => {
      await db("foodEntries").truncate();
      await FoodEntry.add({
        date: "07-27-2019",
        food_id: 1,
        user_id: 1,
        servingQty: 1,
        meal_category_id: 1
      });
    });

    it("should edit the food entry", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateFoodEntry(id: 1, input: {
                date: "07-27-2019",
                food_id: 1,
                user_id: 1,
                servingQty: 2,
                meal_category_id: 1
              }) {
                id
                servingQty
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.updateFoodEntry.id).toBe("1");
      expect(response.body.data.updateFoodEntry.servingQty).toBe(2);
    });

    it("should send an error if missing field like servingQty to edit food entry.", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateFoodEntry(id: 1, input: {
                date: "07-27-2019",
                food_id: 1,
                user_id: 1,
                meal_category_id: 1
              }) {
                id
                servingQty
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe(
        "Field FoodEntryInput.servingQty of required type Int! was not provided."
      );
      expect(response.status).toBe(400);
    });
  });

  describe("Mutation: Delete a food entry", () => {
    beforeEach(async () => {
      await db("foodEntries").truncate();
      await FoodEntry.add({
        date: "07-27-2019",
        food_id: 1,
        user_id: 1,
        servingQty: 1,
        meal_category_id: 1
      });
    });

    it("should delete the food entry and return 1", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteFoodEntry(id: 1)
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.deleteFoodEntry).toBe(1);
    });

    it("should return 0 if food entry doesn't exist", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteFoodEntry(id: 2)
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.deleteFoodEntry).toBe(0);
    });
  });
});
