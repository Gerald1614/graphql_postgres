import uuidv4 from 'uuid/v4.js';

export default {
  Query: {
    creditcards: (parent, args, { models }) => {
      return models.creditcards.findAll();
    },
    creditcard: (parent, { cardid }, { models }) => {
      return models.creditcards.findById(cardid);
    },
  },

  Mutation: {
    createCreditcard: async (parent, { userid, cardnumber }, { models }) => {
      const cardid = uuidv4();
      const creditcard = {
        cardid,
        cardnumber,
        userid,
      };
      await (models.creditcards).createCreditcard(creditcard);
      return creditcard;
    },
    updateCreditcard: async (parent, { cardid, cardnumber }, { models }) => {
      return await (models.creditcards).updateCreditcard(cardid, cardnumber);
    },
    deleteCreditcard: async (parent, { cardid }, { models }) => {
      return await (models.creditcards).deleteCreditcard(cardid);
    },
  },
}