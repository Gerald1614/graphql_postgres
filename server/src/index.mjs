import express from 'express';
import ApolloServer from './utils/ase.cjs';
import cors from 'cors';
import schema from './schema/index.mjs';
import resolvers from './resolvers/index.mjs';
import models from './models/index.mjs'
import {txprocessing} from './txprocessing.mjs'

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