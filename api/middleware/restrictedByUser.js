require('dotenv').config();
const jwt = require('jsonwebtoken');

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (decodedToken.userId.toString() === req.params.id.toString()) {
                req.decodedToken = decodedToken;
                next();
            } else {
                res.status(403).json({
                    error: `Not authorized to edit this user!`
                }); 
            }
        })
    } else {
        res.status(401).json({ message: `Invalid token!` });   
    }
}

module.exports = restricted;