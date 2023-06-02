const userService = require('../services/user');
const { checkAuth } = require('../services/auth');

const createUser = async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.displayName || !req.body.profilePic) {
        return res.status(400).send();
    }
    const user = await userService.getUserByUsername(req.body.username);
    if (user) {
        return res.status(409).send();
    }
    await userService.createUser(req.body);
    return res.status(200).send();
}

const getUserByUsername = async (req, res) => {
    if (req.username !== req.params.username) {
        return res.status(401).send();
    }
    const user = await userService.getUserByUsername(req.params.username);
    return res.status(200).json(user);
}

module.exports = { createUser, getUserByUsername };