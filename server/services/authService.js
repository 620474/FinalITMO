const jwt = require('jsonwebtoken');


function decodeToken(req) {
    const token = req.headers.authorization || req.headers['authorization'];
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
        return null;
    }

}



module.exports = {
    generateJWT: function (user) {
        const tokenData = {username: user.username, id: user._id};
        return jwt.sign({user: tokenData}, process.env.TOKEN_SECRET);

    },
    decodeToken: function (req) {
        const token = req.headers.authorization || req.headers['authorization'];
        if (!token) {
            return null;
        }
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return null;
        }

    },
    requireLogin: function (req, res, next) {
        const token = decodeToken(req);
        if (!token) {
            return res.status(401).json({message: 'You must be logged in'});
        }
        next();
    },
    getUsername: function (req) {
        const token = decodeToken(req);
        if (!token) {
            return null;
        }
        return token.user.username;
    },
    getUserId: function (req) {
        const token = decodeToken(req);
        if (!token) {
            return null;
        }
        return token.user.id;
    }
};
