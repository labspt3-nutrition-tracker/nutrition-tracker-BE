const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

module.exports = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
      return new Date(value).toDateString();
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    }
  })
};
