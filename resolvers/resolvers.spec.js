const request = require("supertest");
const db = require("../data/dbConfig.js");
const Food = require("../models/foodsModel");
const MealCategory = require("../models/mealCategoriesModel");
const User = require("../models/usersModel");
const FoodEntry = require("../models/foodEntriesModel");

describe("Environment", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("Users", () => {
  describe("Query: Get current user", () => {
    it("should return message to login, and return null", async () => {
      const response = await request("http://localhost:4000/")
        .post("/graphql")
        .send({
          query: `
          {
            getCurrentUser {
              id
              firstName
              lastName
              email
            }
          }
          `
        });
      expect(response.body.errors[0].message).toBe("You must be logged in!");
      expect(response.body.data.getCurrentUser).toBeNull();
    });
  });

  describe("Query: Get specific user", () => {
    beforeEach(async () => {
      await db("users").truncate();
      await User.add({
        firstName: "Leila",
        lastName: "Berrouayel",
        email: "nb.leila10@gmail.com",
        userType: "basic",
        calorieGoal: 1200,
        weight: 170
      });
    });
    it("should return user with id 1", async () => {
      const response = await request("http://localhost:4000/")
        .post("/graphql")
        .send({
          query: `
          {
            getUserById(userId: 1) {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getUserById.id).toBe("1");
    });

    it("should return null if user doesn't exist", async () => {
      const response = await request("http://localhost:4000/")
        .post("/graphql")
        .send({
          query: `
          {
            getUserById(userId: 2) {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getUserById).toBeNull();
    });

    it("should return user with email - nb.leila10@gmail.com", async () => {
      const response = await request("http://localhost:4000/")
        .post("/graphql")
        .send({
          query: `
          {
            getUserBy(param: "email", value: "nb.leila10@gmail.com") {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getUserBy.id).toBe("1");
    });

    it("should return null if user with specified email doesn't exist", async () => {
      const response = await request("http://localhost:4000/")
        .post("/graphql")
        .send({
          query: `
          {
            getUserBy(param: "email", value: "nb.leila@gmail.com") {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getUserBy).toBeNull();
    });
  });

  describe("Mutation: Add a user", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should add a new user to the database", async () => {
      const response = await request("http://localhost:4000/")
        .post("/graphql")
        .send({
          query: `
            mutation {
              addUser(input: {
                firstName: "Leila",
                lastName: "Berrouayel",
                email: "nb.leila10@gmail.com",
                userType: "basic",
                calorieGoal: 1200,
                weight: 170
              }) {
                id
                firstName
                lastName
                email
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.addUser.id).toBe("1");
      expect(response.body.data.addUser.firstName).toBe("Leila");
    });

    it("should send an error if missing email to add user", async () => {
      const response = await request("http://localhost:4000/")
        .post("/graphql")
        .send({
          query: `
            mutation {
              addUser(input: {
                firstName: "Leila",
                lastName: "Berrouayel",
                userType: "basic",
                calorieGoal: 1200,
                weight: 170
              }) {
                id
                firstName
                lastName
                email
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe("Field UserInput.email of required type String! was not provided.");
      expect(response.status).toBe(400);
    });
  });

  describe("Mutation: update a user", () => {
    beforeEach(async () => {
      await db("users").truncate();
      await User.add({
        firstName: "Leila",
        lastName: "Berrouayel",
        email: "nb.leila10@gmail.com",
        userType: "basic",
        calorieGoal: 1200,
        weight: 170
      });
    });
    it("should update a user in the database", async () => {
      const response = await request("http://localhost:4000/")
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateUser(input: {
                firstName: "Leila",
                lastName: "Berrouayel",
                email: "nb.leila10@gmail.com",
                userType: "premium",
                calorieGoal: 1200,
                weight: 170
              }, id: 1) {
                userType
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.updateUser.userType).toBe("premium");
    });

    it("should send an error if missing info to update user", async () => {
      const response = await request("http://localhost:4000/")
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateUser(input: {
                firstName: "Leila",
                lastName: "Berrouayel",
                userType: "premium",
                calorieGoal: 1200,
                weight: 170
              }, id: 1) {
                userType
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe("Field UserInput.email of required type String! was not provided.");
      expect(response.status).toBe(400);
    });

    it("should send back null if user doesn't exist", async () => {
      const response = await request("http://localhost:4000/")
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateUser(input: {
                firstName: "Leila",
                lastName: "Berrouayel",
                email: "nb.leila10@gmail.com",
                userType: "premium",
                calorieGoal: 1200,
                weight: 170
              }, id: 2) {
                userType
              }
            }
          `
        });
      expect(response.body.data.updateUser).toBeNull();
      expect(response.status).toBe(200);
    });
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
      const response = await request("http://localhost:4000/")
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
      const response = await request("http://localhost:4000/")
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

      const response = await request("http://localhost:4000/")
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
      const response = await request("http://localhost:4000/")
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
      const response = await request("http://localhost:4000/")
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
});
