import uuidv4 from 'uuid/v4.js';
import { IResolvers } from 'graphql-tools';
const userResolvers: IResolvers = {
  Query: {
    users: (parent, args, { models }) => {
      return models.users.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.users.findById(id);
    },
    me: (parent, args, { me }) => {
      return me;
    }
  },
  Mutation: {
    createUser: async (parent, { username }, { me, models }) => {
      const id = uuidv4();
      const user = {
        id,
        username,
      };
      await (models.users).createUser(user);
      return user
    },
    deleteUser: async (parent, { id }, { models }) => {
      return await (models.users).deleteUser(id);
    },
  }

}
export default userResolvers;