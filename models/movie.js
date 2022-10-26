/* eslint linebreak-style: 0 */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Ссылка не соответствует необходимому формату.',
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Ссылка не соответствует необходимому формату.',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Ссылка не соответствует необходимому формату.',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};


module.exports = mongoose.model('movie', movieSchema);
