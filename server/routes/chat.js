const chatController = require('../controllers/chat');

const express = require('express');
var router = express.Router();

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