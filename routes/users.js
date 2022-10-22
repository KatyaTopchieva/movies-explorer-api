const router = require('express').Router();

const {
  getUsers,
  getUserId,
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('users/:userId', getUserId);
router.patch('/users/me', updateProfile);

module.exports = router;
