const mongoose = require('mongoose');
const { Number } = require('mongoose/lib/schema/index');

const Schema = mongoose.Schema;

const Message = new Schema({
    id: Number,
    created: Date,
    sender: {
        username: String,
        displayName: String,
        profilePic: String
    },
    content: String
});

mongoose.model('Message', Message);

const Chat = new Schema({
    id: Number,
    users: [
        {
            username: String,
            displayName: String,
            profilePic: String
        }
    ],
    messages: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Message'
            }
        ],
        default: []
    }
});

// const connection = mongoose.createConnection('mongodb://localhost:27017/whatsdawn', { useNewUrlParser: true, useUnifiedTopology: true });
// module.exports = connection.model('Chat', Chat);
module.exports = mongoose.model('Chat', Chat);