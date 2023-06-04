const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Message = new Schema({
    created: Date,
    sender: {
        username: String,
        displayName: String,
        profilePic: String
    },
    content: String
});

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/whatsdawn', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = connection.model('Message', Message);