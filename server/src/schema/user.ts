export default `
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }
  extend type Mutation {
    createUser(username: String!): User!
    deleteUser(id: ID!): Boolean!
  }
  type User {
    id: ID!
    username: String!
    creditcards: [Creditcard!]
  }
`;