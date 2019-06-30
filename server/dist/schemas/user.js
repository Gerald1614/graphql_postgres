"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const userSchema = apollo_server_1.makeExecutableSchema({
    typeDefs: apollo_server_1.gql `
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }
  type Mutation {
    createUser(username: String!): User!
    deleteUser(id: ID!): Boolean!
  }
  type User {
    id: ID!
    username: String!
    creditcards: [Creditcard!]
  }
  `
});
apollo_server_1.addMockFunctionsToSchema({ schema: userSchema });
exports.default = userSchema;
//# sourceMappingURL=user.js.map