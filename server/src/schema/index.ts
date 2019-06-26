import userSchema from './user';
import creditcardschema from './creditcard';

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