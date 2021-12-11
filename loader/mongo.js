const { connect } = require('mongoose');
const EnvConfig = require('../config/env');

class MongoLoader {
  constructor() {
    this.dbUrl = EnvConfig.MONGO_DB_URL;
    this.dbName = EnvConfig.MONGO_DB_NAME;
  }

  async load() {
    await connect(this.dbUrl, { dbName: this.dbName });
  }
}

module.exports = MongoLoader;
