const User = require('../models/user');

const createUser = async (user) => {
    const newUser = new User({
        ...user
    });
    await newUser.save();
    return {
        username: user.username,
        displayName: user.displayName,
        profilePic: user.profilePic
    }
}

const getUserByUsername = async (username) => {
    const user = await User.findOne({ username: username });
    return {
        username: user.username,
        displayName: user.displayName,
        profilePic: user.profilePic
    }
}

module.exports = { createUser, getUserByUsername };