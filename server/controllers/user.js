const user = require('../models/user');
const userService = require('../services/user');
const { checkAuth } = require('../services/auth');

const createUser = async (req, res) => {
    const user = userService.getUserByUsername(req.body.username);
    if (user) {
        return res.status(409).send();
    }
    const newUser = await userService.createUser(req.body);
    return res.status(200).json(newUser).send();
}

const getUserByUsername = async (req, res) => {
    const auth = checkAuth(req);
    if (!auth || auth.username !== req.params.username) {
        return res.status(401).send();
    }
    const user = await userService.getUserByUsername(req.params.username);
    return res.status(200).json(user);
}

module.exports = { createUser, getUserByUsername };