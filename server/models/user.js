const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    displayName: String,
    profilePic: String
});

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/whatsdawn', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = connection.model('User', User);