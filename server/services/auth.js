const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send();
    }
    if (!req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).send();
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        req.username = jwt.verify(token, 'secret');
        return next();
    } catch (err) {
        return res.status(401).send();
    }
}

module.exports = { checkAuth };