const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});

io.on('connection', (socket) => {
    socket.on('message', () => {
        socket.broadcast.emit('message', null);
    });
});


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/whatsdawn', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

app.use('/api', require('./routes/api'));

app.use(express.static('public'));
app.get('*', (_, res) => {
  res.redirect('/');
});

server.listen(process.env.PORT);

console.log('Server running on port ' + process.env.PORT);

