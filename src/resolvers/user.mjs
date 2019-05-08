export default {
  Query: {
    users: (parent, args, { models }) => {
      return models.users.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await (models.users).findById(id);
    },
    me: (parent, args, { me }) => {
      return me;
    }
  },

}