const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.createToken = async (userData) => {
    return {
        "accessToken": jwt.sign({ "idUser": userData.idUser, "role": userData.privilege, "username": userData.username, "email": userData.email }, process.env.accessKey, { expiresIn: '15s' }),
        "refreshToken": jwt.sign({ "idUser": userData.idUser, "username": userData.username, "role": userData.privilege, "email": userData.email }, process.env.refreshKey, { expiresIn: '45m' })
    };
}

exports.validateToken = async (token) => {
    jwt.verify(token, process.env.accessKey, function (err) {
        if (err.name === 'TokenExpiredError') res.sendStatus(403);
    });
}

exports.validateAccessTokenExpirationDate = (decoded) => {
    return (decoded.exp < Math.round(new Date().getTime() / 1000)) ? true : false;
}

exports.validateRefreshTokenExpirationDate = (decoded) => {
    return (decoded.exp < Math.round(new Date().getTime() / 1000)) ? true : false;
}

exports.generateNewAccessToken = (decodedToken) => {
    return jwt.sign({ "idUser": decodedToken.idUser, "role": decodedToken.privilege, "username": decodedToken.username, "email": decodedToken.email }, process.env.accessKey, { expiresIn: '5m' });
}

exports.authenticateToken = async (req, res, next) => {
    const token = req.header('accessToken');
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.accessKey, (err, token) => {
        if (err) return res.sendStatus(403)
        next();
    })
}

exports.authorizeToken = async (req, res, next) => {

}