const User = require('../models/user')
const express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();

router.use('/Chats', require('./chat'))
router.use('/Users', require('./user'))

router.post('/Tokens', (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }).then((user) => {
        if(!user) {
            return res.status(404).send()
        }
        const token = jwt.sign(user.username, 'secret')
        return res.status(200).send(token)
    })
})

module.exports = router;