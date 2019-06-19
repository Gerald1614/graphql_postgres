import userSchema from './user.mjs';
import creditcardschema from './creditcard.mjs';

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

export default [linkSchema, userSchema, creditcardschema];