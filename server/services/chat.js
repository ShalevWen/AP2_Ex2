const Chat = require('../models/chat');

const createChat = async (user1, user2) => {
    const newChat = new Chat({
        // TODO: Generate unique id
        id: 1,
        users: [user1, user2]
    });
    return await newChat.save();
}

const deleteChat = async (id) => {
    return await Chat.deleteOne({ id: id });
}

const getChatById = async (id) => {
    return await Chat.findOne({ id: id });
}

const getChatsByUsername = async (username) => {
    const chats = await Chat.find({ users: { username: username } });
    return chats.map(chat => {
        return {
            id: chat._id,
            user: chat.users.filter(user => user.username !== username)[0],
            lastMessage: chat.messages[0]
        }
    });
}

const addMessage = async (chat, message) => {
    chat.messages = [message, ...chat.messages];
    return await chat.save();
}

const getMessages = async (chat) => {
    return await chat.messages;
}

module.exports = { createChat, deleteChat, getChatById, getChatsByUsername, addMessage, getMessages };