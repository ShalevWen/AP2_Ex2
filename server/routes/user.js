const userController = require('../controllers/user');

const express = require('express');
var router = express.Router();

router.post('/', userController.createUser);

router.get('/:username', userController.getUserByUsername);

module.exports = router;