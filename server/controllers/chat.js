const userService = require('../services/user')
const chatService = require('../services/chat');
const { checkAuth } = require('../services/auth');
const express = require('express');

const createChat = async (req, res) => {
    if (!req.body.username) {
        return res.status(400).send();
    }
    if (req.body.username === req.username) {
        return res.status(400).send();
    }
    const user = await userService.getUserByUsername(req.body.username);
    if (!user) {
        return res.status(400).send();
    }
    const chat = await chatService.createChat(req.body.username, req.username);
    return res.status(200).json(chat).send();
}

const deleteChat = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send();
    }
    const chat = chatService.getChatById(req.params.id);
    if (!chat) {
        return res.status(404).send();
    }
    if (!chat.users.map(a => a.username).includes(user)) {
        return res.status(401).send();
    }
    await chatService.deleteChat(req.params.id);
    return res.status(204).send();
}

const getChatById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send();
    }
    const chat = await chatService.getChatById(req.params.id);
    if (!chat) {
        return res.status(404).send();
    }
    if (!chat.users.map(a => a.username).includes(user)) {
        return res.status(401).send();
    }
    return res.status(200).json(chat);
}

const getChatsByUsername = async (req, res) => {
    const chats = await chatService.getChatsByUsername(req.username);
    return await res.status(200).json(chats);
}

const addMessage = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send();
    }
    const chat = await chatService.getChatById(req.params.id);
    if (!chat) {
        return res.status(401).send();
    }
    if (!req.body.msg) {
        return res.status(400).send();
    }
    const user = await userService.getUserByUsername(req.username)
    const users = chat.users.map(a => a.username)
    if (!users.includes(req.username)) {
        return res.status(401).send();
    }
    const messageData = {
        created: new Date(),
        sender: user,
        content: req.body.msg
    }
    const message = await chatService.addMessage(req.params.id, messageData);
    return res.status(200).json({
        id: message._id,
        ...messageData
    });
}

const getMessages = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send();
    }
    const chat = await chatService.getChatById(req.params.id);
    if (!chat) {
        return res.status(401).send();
    }
    if (!chat.users.map(a => a.username).includes(req.username)) {
        return res.status(401).send();
    }
    const messages = await chatService.getMessages(chat);
    return res.status(200).json(messages);
}

module.exports = { createChat, deleteChat, getChatById, getChatsByUsername, addMessage, getMessages };


