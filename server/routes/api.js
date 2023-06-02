const { MongoClient } = require('mongodb');
const express = require('express');
const JWT = require('jsonwebtoken');

var router = express.Router();

router.use('/Chats', require('./chat'))
router.use('/Users', require('./user'))

router.post('/Tokens', (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    const users = client.db('whatsdawn').collection('users')
    users.findOne({ username: req.body.username }).then((user) => {
        if(!user) {
            return res.status(404).send()
        }
        if(user.password !== req.body.password) {
            return res.status(404).send()
        }
        const token = JWT.sign(user.username, 'secret')
        return res.status(200).send(token)
    })
})

module.exports = router;