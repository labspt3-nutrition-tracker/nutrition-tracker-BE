const Message = require("../models/messagesModel");
const User = require("../models/usersModel");

module.exports = {
  Query: {
    getMessagesBy: async (root, args, ctx) => {
      const messages = await Message.findBy({ [args.param]: args.value });
      return messages;
    }
  },
  Message: {
    sender: async (root, args, ctx) => {
      const sender = await User.findById(root.sender);
      return sender;
    },
    recipient: async (root, args, ctx) => {
      const recipient = await User.findById(root.recipient);
      return recipient;
    }
  }
};
