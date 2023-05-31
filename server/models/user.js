const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    displayName: String,
    profilePic: String
});

// const connection = mongoose.createConnection('mongodb://localhost:27017/whatsdawn', { useNewUrlParser: true, useUnifiedTopology: true });
// module.exports = connection.model('User', User);
module.exports = mongoose.model('User', User);