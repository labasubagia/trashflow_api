const express = require('express');
const EnvConfig = require('../config/env');
const router = require('../router');

class AppLoader {
  constructor({ port } = {}) {
    this.port = port || EnvConfig.SERVER_PORT;
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(router);
    this.app.use(this.errorHandler);
  }

  async load() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server run at port ${this.port}`);
    });
  }

  async errorHandler(err, _, res, next) {
    if (res.headersSent) return next(err);
    // eslint-disable-next-line no-param-reassign
    err.status = err.status ? err.status : 500;
    return res.status(err.status).json({ message: err.message });
  }
}

module.exports = AppLoader;
