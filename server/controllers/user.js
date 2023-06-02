const user = require('../models/user');
const userService = require('../services/user');
const { checkAuth } = require('../services/auth');

const createUser = async (req, res) => {
    const user = await userService.getUserByUsername(req.body.username);
    if (user) {
        return res.status(409).send();
    }
    await userService.createUser(req.body);
    return res.status(200).send();
}

const getUserByUsername = async (req, res) => {
    const userename = checkAuth(req);
    if (!userename || userename !== req.params.username) {
        return res.status(401).send();
    }
    const user = await userService.getUserByUsername(req.params.username);
    return res.status(200).json(user);
}

module.exports = { createUser, getUserByUsername };