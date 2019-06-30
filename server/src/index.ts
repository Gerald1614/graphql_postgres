import express from 'express';
import { ApolloServer, makeExecutableSchema} from 'apollo-server-express';
import { GraphQLSchema } from 'graphql'
import cors from 'cors';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import models from './models/index'
import { txprocessing } from './txprocessing'

const app = express();
app.use(cors());

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

// GraphQL
const server = new ApolloServer({
	schema,context: {
		models,
		me: models.users[1],
	  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 3000 }, () => {
	// txprocessing()
  	console.log('Apollo Server on http://localhost:3000/graphql');
});