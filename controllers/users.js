const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/not-found');
const BadRequest = require('../errors/bad-request');
const ConflictError = require('../errors/conflict-error');

const {
  BAD_REQUEST,
  CONFLICT_ERROR,
  NOT_FOUND,
  VALIDATION_ERROR,
} = require('../utils/constants');

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
      throw new ConflictError(CONFLICT_ERROR);
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
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(BAD_REQUEST));
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
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        throw new NotFound(NOT_FOUND);
      }
      res.send(getSimpleUser(user));
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequest(BAD_REQUEST));
      }
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERROR));
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
      return next(new NotFound(NOT_FOUND));
    }
    return res.status(200).send(user);
  }).catch(next);
};
