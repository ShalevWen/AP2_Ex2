const JWT = require('jsonwebtoken');

const checkAuth = (req) => {
    if (!req.headers.authorization) {
        return null;
    }
    if (!req.headers.authorization.startsWith('Bearer ')) {
        return null;
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = JWT.verify(token, 'secret');
    if (!decoded) {
        return null;
    }
    return decoded;
}

module.exports = { checkAuth };