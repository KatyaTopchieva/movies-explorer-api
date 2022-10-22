const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

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
      throw new Error(`Пользователь с ${email} уже существует.`);
    }
    return bcrypt.hash(req.body.password, 10);
  })
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(201).send(getSimpleUser(user)))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name } = req.body;
  User.findByIdAndUpdate(req.user._id, { name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new Error('Пользователь не найден');
      }
      res.send(getSimpleUser(user));
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Переданы некорректные данные');
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new Error('Неправильные почта или пароль')));
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    if (!user) {
      return next(new Error('Пользователь не найден.'));
    }

    return res.status(200).send(user);
  }).catch(next);
};

module.exports = router;
