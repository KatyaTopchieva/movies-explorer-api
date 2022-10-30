const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

const mainErrorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || INTERNAL_SERVER_ERROR;

  res.status(status).send({ message });
  next();
};

module.exports = mainErrorHandler;
