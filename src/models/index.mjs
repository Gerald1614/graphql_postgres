

const models = {
  User: sequelize.import('/Users/gmichelant/Documents/graphql_postgres/src/models/user.mjs'),
  Message: sequelize.import('/Users/gmichelant/Documents/graphql_postgres/src/models/message.mjs'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;