const indexRouter = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { signUp, signIn } = require('../utils/validations');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/not-found');
const { NOT_FOUND } = require('../utils/constants');

indexRouter.post('/signin', signIn, login);
indexRouter.post('/signup', signUp, createUser);
indexRouter.use('/users', auth, userRouter);
indexRouter.use('/movies', auth, movieRouter);
indexRouter.use('*', auth, (req, res, next) => {
  const error = new NotFound(NOT_FOUND);
  next(error);
});

module.exports = indexRouter;
