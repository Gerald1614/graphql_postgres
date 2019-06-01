import uuidv4 from 'uuid/v4.js';

export default {
  Query: {
    messages: (parent, args, { models }) => {
      return models.messages.findAll();
    },
    message: (parent, { id }, { models }) => {
      return models.messages.findById(id);
    },
  },

  Mutation: {
    createMessage: async (parent, { userid, text }, { models }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userid,
      };
      console.log(message)
      await (models.messages).createMessage(message);
      return message;
    },
    updateMessage: async (parent, { id, text }, { models }) => {
      return await (models.messages).updateMessage(id, text);
    },
    deleteMessage: async (parent, { id }, { models }) => {
      return await (models.messages).deleteMessage(id);
    },
  },
}