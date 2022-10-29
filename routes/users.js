const userRouter = require('express').Router();

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

const { updateProfileValidation } = require('../utils/validations');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateProfileValidation, updateProfile);

module.exports = userRouter;
