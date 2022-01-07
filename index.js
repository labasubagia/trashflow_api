const AppLoader = require('./loader/app');
const MongoLoader = require('./loader/mongo');

const startServer = (...loaders) => {
  try {
    loaders.forEach(async (Loader) => new Loader().load());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

startServer(MongoLoader, AppLoader);
