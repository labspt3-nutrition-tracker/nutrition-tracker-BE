const request = require("supertest");
const db = require("../data/dbConfig.js");
const User = require("../models/usersModel");

describe("Environment", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("Get current user query", () => {
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
});
// .then(res => console.log("**** response: ", res.body));
// return request("http://localhost:4000/")
//   .post("/graphql")
//   .send({
//     query: `
//     {
//       getUserById(userId: 1) {
//         id
//         weight
//         firstName
//         lastName
//         email
//       }
//     }
//   `
//   })
//   .expect(200)
//   .then(res => console.log("**** response: ", res.body.data.getUserById));
//   });
// });
