const request = require("supertest");
const db = require("../../data/dbConfig.js");
const User = require("../../models/usersModel");
const Coach = require("../../models/coachesModel");

const server = "http://localhost:4000/";

describe("Coaches", () => {
  beforeEach(async () => {
    await db("coaches").truncate();
    await db("users").truncate();
    await User.add({
      firstName: "coach",
      lastName: "lastname",
      email: "email1",
      userType: "basic",
      calorieGoal: 1200,
      weight: 0
    });
    await User.add({
      firstName: "trainee",
      lastName: "lastname",
      email: "email2",
      userType: "basic",
      calorieGoal: 1200,
      weight: 0
    });
    await Coach.add(1, 2);
  });

  describe("Query: Get all coaches for a specific trainee", () => {
    it("should return an array of coaches for trainee 2", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getCoaches(trainee_id: 2) {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getCoaches).toBeInstanceOf(Array);
      expect(response.body.data.getCoaches).toHaveLength(1);
      expect(response.body.data.getCoaches[0].id).toBe("1");
    });
    it("should return an empty array if trainee 2 has no coach", async () => {
      await db("coaches").truncate();

      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            {
              getCoaches(trainee_id: 2) {
                id
              }
            }
            `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getCoaches).toBeInstanceOf(Array);
      expect(response.body.data.getCoaches).toHaveLength(0);
    });
  });

  describe("Query: Get all trainees for a specific coach", () => {
    it("should return an array of trainees for coach 1", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getTrainees(coach_id: 1) {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getTrainees).toBeInstanceOf(Array);
      expect(response.body.data.getTrainees).toHaveLength(1);
      expect(response.body.data.getTrainees[0].id).toBe("2");
    });
    it("should return an empty array if coach 1 has no trainees", async () => {
      await db("coaches").truncate();

      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            {
              getTrainees(coach_id: 1) {
                id
              }
            }
            `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getTrainees).toBeInstanceOf(Array);
      expect(response.body.data.getTrainees).toHaveLength(0);
    });
  });

  describe("Mutation: Add a trainee to a coach", () => {
    beforeEach(async () => {
      await db("coaches").truncate();
    });
    it("Should add a link between a coach and a trainee", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addTrainees(coach_id: 1, trainee_id: 2) {
                id
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.addTrainees.id).toBe("2");
    });
  });

  describe("Mutation: Remove a trainee from a coach's trainees list", () => {
    it("Should delete the link between a coach and a trainee", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteTrainees(coach_id: 1, trainee_id: 2)
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.deleteTrainees).toBe(1);
    });
  });
});
