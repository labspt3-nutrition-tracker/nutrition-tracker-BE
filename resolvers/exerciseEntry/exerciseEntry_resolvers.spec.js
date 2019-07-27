const request = require("supertest");
const db = require("../../data/dbConfig.js");
const User = require("../../models/usersModel");
const Exercise = require("../../models/exerciseEntriesModel");

const server = "http://localhost:4000/";

describe("Environment", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("Exercise Entries", () => {
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

  describe("Query: Get exercise entries for specific user", () => {
    beforeEach(async () => {
      await db("exerciseEntries").truncate();
      await Exercise.add({
        exerciseEntryDate: "07-27-2019",
        exerciseName: "cycling",
        caloriesBurned: 500,
        exercise_entry_user_id: 1
      });
    });

    it("should return array of exercise entries", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getExerciseEntriesByUserId(userId: 1) {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getExerciseEntriesByUserId).toBeInstanceOf(Array);
      expect(response.body.data.getExerciseEntriesByUserId).toHaveLength(1);
    });

    it("should return an empty array if user doesn't exist", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getExerciseEntriesByUserId(userId: 2) {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getExerciseEntriesByUserId).toBeInstanceOf(Array);
      expect(response.body.data.getExerciseEntriesByUserId).toHaveLength(0);
    });

    it("should return an empty array if no exercise entries exist for that user", async () => {
      await db("exerciseEntries").truncate();

      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getExerciseEntriesByUserId(userId: 1) {
              id
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getExerciseEntriesByUserId).toBeInstanceOf(Array);
      expect(response.body.data.getExerciseEntriesByUserId).toHaveLength(0);
    });
  });

  describe("Mutation: Add an exercise entry", () => {
    beforeEach(async () => {
      await db("exerciseEntries").truncate();
    });

    it("should add an exercise entry", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addExerciseEntry(input: {
                exerciseEntryDate: "07-27-2019",
                exerciseName: "cycling",
                caloriesBurned: 500,
                exercise_entry_user_id: 1
              }) {
                id
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.addExerciseEntry.id).toBe("1");
    });

    it("should send an error if missing field like exerciseName to add exercise entry.", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addExerciseEntry(input: {
                exerciseEntryDate: "07-27-2019",
                caloriesBurned: 500,
                exercise_entry_user_id: 1
              }) {
                id
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe(
        "Field ExerciseEntryInput.exerciseName of required type String! was not provided."
      );
      expect(response.status).toBe(400);
    });
  });

  describe("Mutation: Edit an exercise entry", () => {
    beforeEach(async () => {
      await db("exerciseEntries").truncate();
      await Exercise.add({
        exerciseEntryDate: "07-27-2019",
        exerciseName: "cycling",
        caloriesBurned: 500,
        exercise_entry_user_id: 1
      });
    });

    it("should edit the exercise entry", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateExerciseEntry(id: 1, input: {
                exerciseEntryDate: "07-27-2019",
                exerciseName: "cycling",
                caloriesBurned: 600,
                exercise_entry_user_id: 1
              }) {
                id
                caloriesBurned
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.updateExerciseEntry.id).toBe("1");
      expect(response.body.data.updateExerciseEntry.caloriesBurned).toBe(600);
    });

    it("should send an error if missing field like exerciseName to edit exercise entry.", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateExerciseEntry(id: 1, input: {
                exerciseEntryDate: "07-27-2019",
                caloriesBurned: 500,
                exercise_entry_user_id: 1
              }) {
                id
                caloriesBurned
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe(
        "Field ExerciseEntryInput.exerciseName of required type String! was not provided."
      );
      expect(response.status).toBe(400);
    });
  });

  describe("Mutation: Delete an exercise entry", () => {
    beforeEach(async () => {
      await db("exerciseEntries").truncate();
      await Exercise.add({
        exerciseEntryDate: "07-27-2019",
        exerciseName: "cycling",
        caloriesBurned: 500,
        exercise_entry_user_id: 1
      });
    });

    it("should delete the exercise entry and return 1", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteExerciseEntry(id: 1)
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.deleteExerciseEntry).toBe(1);
    });

    it("should return 0 if Exercise entry doesn't exist", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteExerciseEntry(id: 2)
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.deleteExerciseEntry).toBe(0);
    });
  });
});
