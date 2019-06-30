"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./schemas/index"));
const index_2 = __importDefault(require("./resolvers/index"));
const app = express_1.default();
app.use(cors_1.default());
const schema = apollo_server_express_1.mergeSchemas({
    schemas: index_1.default,
    resolvers: index_2.default
});
// GraphQL
const server = new apollo_server_express_1.ApolloServer({
    schema,
    context: (req) => __awaiter(this, void 0, void 0, function* () {
        // If we want to put some restriction
    })
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 3000 }, () => {
    console.log('Apollo Server on http://localhost:3000/graphql');
});
//# sourceMappingURL=index.js.map