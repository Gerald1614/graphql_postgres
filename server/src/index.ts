import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import schema from './schema/index';
import resolvers from './resolvers/index';
import models from './models/index'
import {txprocessing} from './txprocessing'

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models
  },
});

server.applyMiddleware({ app, path: '/graphql' });

txprocessing()
app.listen({ port: 3000 }, () => {
  console.log('Apollo Server on http://localhost:3000/graphql')
});