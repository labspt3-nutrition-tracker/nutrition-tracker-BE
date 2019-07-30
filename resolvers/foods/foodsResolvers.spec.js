const request = require("supertest");
const db = require("../../data/dbConfig.js");
const Food = require("../../models/foodsModel");

const server = "http://localhost:4000/";

describe("Environment", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("Foods", () => {
  describe("Query: Get foods", () => {
    beforeEach(async () => {
      await db("foods").truncate();
      await Food.add({
        foodName: "Apple",
        caloriesPerServ: 57,
        fats: 0.12,
        carbs: 13.68,
        proteins: 0.25
      });
    });

    it("should return array of foods", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getFoods {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getFoods).toBeInstanceOf(Array);
      expect(response.body.data.getFoods).toHaveLength(1);
    });

    it("should return an empty array if no food exist", async () => {
      await db("foods").truncate();

      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getFoods {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getFoods).toBeInstanceOf(Array);
      expect(response.body.data.getFoods).toHaveLength(0);
    });
  });

  describe('"Mutation: Add a food', () => {
    beforeEach(async () => {
      await db("foods").truncate();
    });
    it("should add a food to the database", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addFood(input: {
                foodName: "Apple",
                caloriesPerServ: 57,
                fats: 0.12,
                carbs: 13.68,
                proteins: 0.25
              }) {
                id
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.addFood.id).toBe("1");
    });

    it("should send an error if missing field, like fats, to add food", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addFood(input: {
                foodName: "Apple",
                caloriesPerServ: 57,
                carbs: 13.68,
                proteins: 0.25
              }) {
                id
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe("Field FoodInput.fats of required type Float! was not provided.");
      expect(response.status).toBe(400);
    });
  });

  describe("Mutation: Edit a food", () => {
    beforeEach(async () => {
      await db("foods").truncate();
      await Food.add({
        foodName: "Apple",
        caloriesPerServ: 57,
        fats: 0.12,
        carbs: 13.68,
        proteins: 0.25
      });
    });

    it("should edit the food", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateFood(id: 1, input: {
                foodName: "Apple",
                caloriesPerServ: 60,
                fats: 0.12,
                carbs: 13.68,
                proteins: 0.25
              }) {
                id
                caloriesPerServ
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.updateFood.id).toBe("1");
      expect(response.body.data.updateFood.caloriesPerServ).toBe(60);
    });

    it("should send an error if missing field like caloriesPerServ to edit food", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateFood(id: 1, input: {
                foodName: "Apple",
                fats: 0.12,
                carbs: 13.68,
                proteins: 0.25
              }) {
                id
                caloriesPerServ
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe(
        "Field FoodInput.caloriesPerServ of required type Int! was not provided."
      );
      expect(response.status).toBe(400);
    });
  });

  describe("Mutation: Delete a food", () => {
    beforeEach(async () => {
      await db("foods").truncate();
      await Food.add({
        foodName: "Apple",
        caloriesPerServ: 57,
        fats: 0.12,
        carbs: 13.68,
        proteins: 0.25
      });
    });

    it("should delete the food and return 1", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteFood(id: 1)
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.deleteFood).toBe(1);
    });

    it("should return 0 if food doesn't exist", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteFood(id: 2)
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.deleteFood).toBe(0);
    });
  });
});
