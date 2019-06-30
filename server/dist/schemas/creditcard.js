"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const creditcardSchema = apollo_server_1.makeExecutableSchema({
    typeDefs: apollo_server_1.gql `
  type Query {
   creditcards: [Creditcard!]!
   creditcard(cardid: ID!): Creditcard!
  }
  
  type Mutation {
    createCreditcard(cardnumber: String!, userid:String!): Creditcard!
    updateCreditcard(cardnumber: String!, cardid: ID!): Creditcard!
    deleteCreditcard(cardid: ID!): Boolean!
  }

  type Creditcard {
    cardid: ID!
    cardnumber: String!
    userid: User!
  }
  `
});
apollo_server_1.addMockFunctionsToSchema({ schema: creditcardSchema });
exports.default = creditcardSchema;
//# sourceMappingURL=creditcard.js.map