const chatController = require('../controllers/chat');

const express = require('express');
var router = express.Router();

const auth = require('../services/auth');
router.use(auth.checkAuth);

router.route('/')
    .get(chatController.getChatsByUsername)
    .post(chatController.createChat);

router.route('/:id')
    .get(chatController.getChatById)
    .delete(chatController.deleteChat);

router.route('/:id/Messages')
    .post(chatController.addMessage)
    .get(chatController.getMessages);


module.exports = router;