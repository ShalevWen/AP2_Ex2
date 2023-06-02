const userService = require('./user');
const Chat = require('../models/chat');
const Message = require('../models/message')

const getMessageById = async (id) => {
    if (!id) return null;
    const msg = await Message.findById(id);
    return {
        id: msg._id,
        created: msg.created,
        sender: msg.sender,
        content: msg.content
    }
}

const createChat = async (username1, username2) => {
    const user1 = await userService.getUserByUsername(username1);
    const user2 = await userService.getUserByUsername(username2);
    const newChat = new Chat({
        users: [user1, user2],
        messages: []
    });
    const chat = await newChat.save();
    return {
        id: chat._id,
        user: user2
    };
}

const deleteChat = async (id) => {
    const chat = await Chat.findById(id)
    await Message.deleteMany({ _id: chat.messages.map(msg => msg._id) })
    await Chat.findByIdAndDelete(id);
}

const getChatById = async (id) => {
    const chat = await Chat.findById(id);
    const users = chat.users.map(user => ({
        username: user.username,
        displayName: user.displayName,
        profilePic: user.profilePic
    }));
    return {
        id: chat._id,
        users: users,
        messages: chat.messages
    };
}

const getChatsByUsername = async (username) => {
    const chats = await Chat.find({ users: { $elemMatch: { username: username } } })
    for (var i = 0; i < chats.length; i++) {
        const user = chats[i].users.filter(user => user.username !== username)[0];
        const lastMessageId = chats[i].messages[0] ? chats[i].messages[0] : null;
        chats[i] =  {
            id: chats[i]._id,
            user: {
                username: user.username,
                displayName: user.displayName,
                profilePic: user.profilePic
            },
            lastMessage: await getMessageById(lastMessageId)
        }
    }
    return chats;
}

const addMessage = async (chatId, messageData) => {
    const message = new Message(messageData);
    await message.save();
    console.log(message)
    await Chat.updateOne({ _id: chatId }, {
        $push: {
            messages: {
                $each: [message],
                $position: 0
            }
        }
    })
    return message;
}

const getMessages = async (chat) => {
    var messages = [];
    for (var i = 0; i < chat.messages.length; i++) {
        messages.push(await getMessageById(chat.messages[i]))
    }
    return messages;
}

module.exports = { createChat, deleteChat, getChatById, getChatsByUsername, addMessage, getMessages };