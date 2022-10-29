const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/not-found');
const BadRequest = require('../errors/bad-request');
const ConflictError = require('../errors/conflict-error');

const getSimpleUser = (user) => ({
  data:
    {
      email: user.email,
      name: user.name,
    },
});

module.exports.createUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      throw new ConflictError(`Пользователь с ${email} уже существует.`);
    }
    return bcrypt.hash(req.body.password, 10);
  })
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(201).send(getSimpleUser(user)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Неверные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.send(getSimpleUser(user));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Неверные данные'));
      }
      if (err.code === 11000) {
        next(new ConflictError(`Пользователь с ${email} уже существует.`));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    if (!user) {
      return next(new NotFound('Пользователь не найден.'));
    }
    return res.status(200).send(user);
  }).catch(next);
};
