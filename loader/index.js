const AppLoader = require('./app');
const MongoLoader = require('./mongo');

const loadServer = async ({ port } = {}) => {
  const app = new AppLoader(port);
  const mongo = new MongoLoader();
  await mongo.load();
  await app.load();
};

module.exports = loadServer;
