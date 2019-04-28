import express from 'express';
import ApolloServer from './utils/ase.cjs';
import cors from 'cors';
import {users, me } from './utils/users.mjs'

const app = express();
app.use(cors());

const schema = `
  type Query {
    me: User
    users: [User!]
    user(id: ID!): User
  }
  type User {
    id: ID!
    username: String!
  }
  `;
const resolvers = {
  Query: {
    me: () => {
      return me
    },
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
  },
}
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});