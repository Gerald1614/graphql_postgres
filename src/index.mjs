import express from 'express';
import ApolloServer from './utils/ase.cjs';
import cors from 'cors';
import { users } from './utils/users.mjs'

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
    me: (parent, args, { me }) => {
      return me;
    },
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
  },
  User: {
    username: parent => {
      return parent.username;
    }
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});