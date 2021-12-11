const env = require('dotenv');

env.config();

const EnvConfig = {
  PORT: process.env.PORT || 5000,

  MONGO_DB_URL: process.env.MONGO_DB_URL,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,

  UPLOAD_IMG_URL: process.env.UPLOAD_IMG_URL,
  UPLOAD_IMG_TOKEN: process.env.UPLOAD_IMG_TOKEN,
};

module.exports = EnvConfig;
