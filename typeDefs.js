const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID
    name: String
    email: String
  }

  type Query {
    me: User
  }
`;
