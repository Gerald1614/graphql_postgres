
import { IResolvers } from 'graphql-tools';
import userResolvers from './user';
import creditcardResolvers from './creditcard';


export default [ userResolvers, creditcardResolvers ];