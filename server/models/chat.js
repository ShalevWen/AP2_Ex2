const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Chat = new Schema({
    users: [
        {
            username: String,
            displayName: String,
            profilePic: String
        }
    ],
    messages: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Message'
        }
    ]
});

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/whatsdawn', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = connection.model('Chat', Chat);