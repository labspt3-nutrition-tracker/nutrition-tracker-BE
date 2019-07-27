const request = require("supertest");
const db = require("../../data/dbConfig.js");
const User = require("../../models/usersModel");
const Message = require("../../models/messagesModel");

const server = "http://localhost:4000/";

describe("Messages", () => {
  beforeEach(async () => {
    await db("messages").truncate();
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
    await Message.add({
      type: "text",
      text: "Message from inside testing.",
      read: false,
      sender: 1,
      recipient: 2
    });
  });

  describe("Query: Get all message sent by user 1", () => {
    it("should return an array of messages", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getMessagesBy(param: "sender", value: "1") {
              id
              sender {
                id
              }
              recipient {
                id
              }
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getMessagesBy).toBeInstanceOf(Array);
      expect(response.body.data.getMessagesBy).toHaveLength(1);
      expect(response.body.data.getMessagesBy[0].recipient.id).toBe("2");
    });
    it("should return an empty array if trainee 2 has no coach", async () => {
      await db("messages").truncate();

      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            {
              getMessagesBy(param: "sender", value: "1") {
                id
              }
            }
            `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getMessagesBy).toBeInstanceOf(Array);
      expect(response.body.data.getMessagesBy).toHaveLength(0);
    });
  });

  describe("Query: Get all message received by user 2", () => {
    it("should return an array of messages", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
          {
            getMessagesBy(param: "recipient", value: "2") {
              id
              sender {
                id
              }
              recipient {
                id
              }
            }
          }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getMessagesBy).toBeInstanceOf(Array);
      expect(response.body.data.getMessagesBy).toHaveLength(1);
      expect(response.body.data.getMessagesBy[0].sender.id).toBe("1");
    });
    it("should return an empty array if trainee 2 has no coach", async () => {
      await db("messages").truncate();

      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            {
              getMessagesBy(param: "recipient", value: "2") {
                id
              }
            }
            `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.getMessagesBy).toBeInstanceOf(Array);
      expect(response.body.data.getMessagesBy).toHaveLength(0);
    });
  });

  describe("Mutation: Add a message between two users", () => {
    beforeEach(async () => {
      await db("messages").truncate();
    });
    it("Should add a message between users 1 and 2", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addMessage(input: {
                type: "text",
                text: "Message from inside testing.",
                read: false,
                sender: 1,
                recipient: 2
              }) {
                id
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.addMessage.id).toBe("1");
    });
    it("should send an error if missing field like text to add message.", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addMessage(input: {
                type: "text",
                read: false,
                sender: 1,
                recipient: 2
              }) {
                id
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe(
        "Field MessageInput.text of required type String! was not provided."
      );
      expect(response.status).toBe(400);
    });
  });

  describe("Mutation: Delete a message", () => {
    it("Should delete the message between users 1 and 2", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              deleteMessage(id: 1)
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.deleteMessage).toBe(1);
    });
  });

  describe("Mutation: update a message between two users", () => {
    it("Should update the read flag of a message between users 1 and 2", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              updateMessage(id: 1, input: {
                type: "text",
                text: "Message from inside testing.",
                read: true,
                sender: 1,
                recipient: 2
              }) {
                id
                read
              }
            }
          `
        });
      expect(response.status).toBe(200);
      expect(response.body.data.updateMessage.read).toBe(true);
    });
    it("should send an error if missing field like read to update message.", async () => {
      const response = await request(server)
        .post("/graphql")
        .send({
          query: `
            mutation {
              addMessage(input: {
                type: "text",
                text: "Message from inside testing.",
                sender: 1,
                recipient: 2
              }) {
                id
              }
            }
          `
        });
      expect(response.body.errors[0].message).toBe(
        "Field MessageInput.read of required type Boolean! was not provided."
      );
      expect(response.status).toBe(400);
    });
  });
});
