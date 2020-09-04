const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuthenticated')
const userController = require('../controllers/user')

/* example routes */
router.get('/', isAuth, userController.getAll);
router.get('/profile', isAuth, userController.getUserProfile);

module.exports = router;