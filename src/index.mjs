import express from 'express';
import ApolloServer from './utils/ase.cjs';
import cors from 'cors';
import schema from './schema/index.mjs';
import resolvers from './resolvers/index.mjs';
import models from './models/index.mjs'

const app = express();
app.use(cors());


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});