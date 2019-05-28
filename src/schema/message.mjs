export default `
  extend type Query {
   messages: [Message!]!
    message(id: ID!): Message!
  }
  
  extend type Mutation {
    createMessage(text: String!, userid:String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    userid: User!
  }
  `;