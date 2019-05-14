const user = {
  _id: "1",
  name: "Leila",
  email: "leila@leila.com"
};

module.exports = {
  Query: {
    me: () => user
  }
};
