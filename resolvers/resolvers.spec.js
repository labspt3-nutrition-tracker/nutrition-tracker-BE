const request = require("supertest");
const db = require("../data/dbConfig.js");
const User = require("../models/usersModel");

describe("Environment", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("Users", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

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

  describe("Mutation: Add a user", () => {
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
    it("should update a user in the database", async () => {
      await User.add({
        firstName: "Leila",
        lastName: "Berrouayel",
        email: "nb.leila10@gmail.com",
        userType: "basic",
        calorieGoal: 1200,
        weight: 170
      });
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
      await User.add({
        firstName: "Leila",
        lastName: "Berrouayel",
        email: "nb.leila10@gmail.com",
        userType: "basic",
        calorieGoal: 1200,
        weight: 170
      });
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
  });
});

// .then(res => console.log("**** response: ", res.body))
