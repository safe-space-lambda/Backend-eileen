require('dotenv').config();
const jwt = require('jsonwebtoken');

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: `Invalid token!` });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ error: `No token found!` });
    }
}

module.exports = restricted;