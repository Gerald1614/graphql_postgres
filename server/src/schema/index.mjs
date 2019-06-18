import userSchema from './user.mjs';
import messageSchema from './message.mjs';

const linkSchema = `
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, messageSchema];