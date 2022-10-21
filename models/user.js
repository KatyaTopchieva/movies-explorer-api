/* eslint linebreak-style: 0 */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Адрес электронной почты не соответствует необходимому формату.',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
