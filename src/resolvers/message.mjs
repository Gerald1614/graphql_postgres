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

    deleteMessage: (parent, { id }, { models }) => {
      const { [id]: message, ...otherMessages } = models.messages;

      if (!message) {
        return false;
      }

      models.messages = otherMessages;

      return true;
    },
  },
}