const chat = require('../models/chat');
const chatService = require('../services/chat');
const { checkAuth } = require('../services/auth');

const createChat = async (req, res) => {
    const user = checkAuth(req);
    const chat = await chatService.createChat(user, req.body.username);
    return res.status(200).json({
        id: chat._id,
        user: chat.users.filter(user => user.username !== user.username)[0]
    });
}

const deleteChat = async (req, res) => {
    // TODO: Add authorization
    const chat = chatService.getChatById(req.params.id);
    if (!chat) {
        return res.status(404).send();
    }
    await chatService.deleteChat(req.params.id);
    return res.status(204).send();
}

const getChatById = async (req, res) => {
    // TODO: Add authorization
    const chat = await chatService.getChatById(req.params.id);
    if (!chat) {
        return res.status(404).send();
    }
    return res.status(200).json(chat);
}

const getChatsByUsername = async (req, res) => {
    const user = checkAuth(req);
    if (!user) {
        return res.status(401).send();
    }
    const chats = await chatService.getChatsByUsername(req.params.username);
    return await res.status(200).json(chats);
}

const addMessage = async (req, res) => {
    // TODO: Add authorization
    const chat = await chatService.getChatById(req.params.id);
    if (!chat) {
        return res.status(401).send();
    }
    const message = {
        // TODO: Generate unique id
        id: 1,
        created: new Date(),
        // TODO: Get user from token
        user: req.body.user,
        content: req.body.msg
    }
    await chatService.addMessage(chat, message);
    return res.status(200).json(message);
}

const getMessages = async (req, res) => {
    checkAuth(req);
    const chat = await chatService.getChatById(req.params.id);
    if (!chat) {
        return res.status(401).send();
    }
    const messages = await chatService.getMessages(chat);
    return res.status(200).json(messages);
}

module.exports = { createChat, deleteChat, getChatById, getChatsByUsername, addMessage, getMessages };


