const router = require('express').Router();

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

const { updateProfileValidation } = require('../utils/validations');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = router;
