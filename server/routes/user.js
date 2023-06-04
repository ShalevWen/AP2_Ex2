const userController = require('../controllers/user');

const express = require('express');
var router = express.Router();

const auth = require('../services/auth');

router.post('/', userController.createUser);

router.get('/:username', auth.checkAuth, userController.getUserByUsername);

module.exports = router;