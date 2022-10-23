const router = require('express').Router();

const {
  getUsers,
  getUserId,
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

const {
  userIdValidation,
  updateProfileValidation,
} = require('../utils/validations');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('users/:userId', userIdValidation, getUserId);
router.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = router;
