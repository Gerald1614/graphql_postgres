export default `
  extend type Query {
   creditcards: [Creditcard!]!
   creditcard(id: ID!): Creditcard!
  }
  
  extend type Mutation {
    createCreditcard(cardnumber: String!, userid:String!): Creditcard!
    updateCreditcard(cardnumber: String!, id: ID!): Creditcard!
    deleteCreditcard(id: ID!): Boolean!
  }

  type Creditcard {
    id: ID!
    cardnumber: String!
    userid: User!
  }
  `;