const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const api = require('./routes/api');
app.use('/api', api);

app.get('/', (_, res) => {
    res.redirect('http://localhost:3000');
});

console.log('Server listening on port 6000');
app.listen(6000)
console.log('Server listening on port 6000');