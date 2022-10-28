const mainErrorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Внутренняя ошибка сервера';

  res.status(status).send({
    err: error,
    message,
  });
  next();
};

module.exports = mainErrorHandler;
