import uuidv4 from 'uuid/v4.js';

export default {
  Query: {
    creditcards: (parent, args, { models }) => {
      return models.creditcards.findAll();
    },
    creditcard: (parent, { id }, { models }) => {
      return models.creditcards.findById(id);
    },
  },

  Mutation: {
    createCreditcard: async (parent, { userid, cardnumber }, { models }) => {
      const id = uuidv4();
      const creditcard = {
        id,
        cardnumber,
        userid,
      };
      console.log(creditcard)
      await (models.creditcards).createCreditcard(creditcard);
      return creditcard;
    },
    updateCreditcard: async (parent, { id, cardnumber }, { models }) => {
      return await (models.creditcards).updateCreditcard(id, cardnumber);
    },
    deleteCreditcard: async (parent, { id }, { models }) => {
      return await (models.creditcards).deleteCreditcard(id);
    },
  },
}