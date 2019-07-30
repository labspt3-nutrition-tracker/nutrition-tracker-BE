const request = require("supertest");
const db = require("../../data/dbConfig.js");
const User = require("../../models/usersModel");
const Weight = require("../../models/weightEntriesModel");

const server = "http://localhost:4000/";

describe("Weight", () => {
  beforeEach(async () => {
    await db("weightEntries").truncate();
    await db("users").truncate();
    await User.add({
      firstName: "user1",
      lastName: "lastname",
      email: "email1",
      userType: "basic",
      calorieGoal: 1200,
      weight: 0
    });
    await Weight.add({
      date: "07-27-2019",
      weight: 150,
      user_id: 1
    });
  });

  describe("Query: Get all weight entries of user 1", () => {
    it("should return an array of weight entries", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getWeightEntriesByUserId(userId: 1) {
              id
              user_id {
                id
              }
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getWeightEntriesByUserId).toBeInstanceOf(Array);
      expect(response.body.data.getWeightEntriesByUserId).toHaveLength(1);
      expect(response.body.data.getWeightEntriesByUserId[0].user_id.id).toBe("1");
    });
    it("should return an empty array if user 1 has no weight entry", async () => {
      await db("weightEntries").truncate();

      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            {
              getWeightEntriesByUserId(userId: 1) {
                id
              }
            }
            `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getWeightEntriesByUserId).toBeInstanceOf(Array);
      expect(response.body.data.getWeightEntriesByUserId).toHaveLength(0);
    });
  });

  describe("Mutation: Add a weight entry", () => {
    beforeEach(async () => {
      await db("weightEntries").truncate();
    });
    it("Should add a weight entry for user 1", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addWeightEntry(input: {
                date: "07-27-2019",
                weight: 150,
                user_id: 1
              }) {
                id
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.addWeightEntry.id).toBe("1");
    });

    it("should send an error if missing field like weight to add weight entry.", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addWeightEntry(input: {
                date: "07-27-2019",
                user_id: 1
              }) {
                id
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe(
        "Field WeightEntryInput.weight of required type Float! was not provided."
      );
      expect(response.status).toBe(400);
    });
  });
});
