export default `
  extend type Query {
   creditcards: [Creditcard!]!
   creditcard(cardid: ID!): Creditcard!
  }
  
  extend type Mutation {
    createCreditcard(cardnumber: String!, userid:String!): Creditcard!
    updateCreditcard(cardnumber: String!, cardid: ID!): Creditcard!
    deleteCreditcard(cardid: ID!): Boolean!
  }

  type Creditcard {
    cardid: ID!
    cardnumber: String!
    userid: User!
  }
  `;