const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/whatsdawn', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const cors = require('cors');
app.use(cors());

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

app.use('/api', require('./routes/api'));

app.use(express.static('public'));
app.get('*', (_, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT)
console.log('Server running on port ' + process.env.PORT);