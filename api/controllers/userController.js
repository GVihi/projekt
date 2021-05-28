const User = require('../models/userModel');
const jwtMiddleware = require('../middleware/jsonWebToken');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.json');
require('dotenv').config()

exports.register = async (req, res, next) => {
    // we check if user already exists
    await User.checkCredentials(req.body.username, req.body.email).then(async (response) => {

        // we check if we got back data, if we got it, user exists
        if (response[0].length) res.json("User already exists. Need new email or username.");
        else {
            // creating new user, we encrypt password for given data
            const encryptedUser = await User.encryptUser(req.body);

            // we create user with encrypted data
            await User.createUser(encryptedUser).then(async (created) => {

                // as newly created user we give him basic privilege
                await User.createPrivilege(created[0].insertId).then(() => {

                    // user created with privilege
                    res.json("User " + created[0].insertId + " created");

                }).catch((err) => {
                    console.log("Pivilege error-> " + err);
                })
            }).catch(() => {
                // user was not created
                res.json("User was not created. Error occured.")
            })
        }

    }).catch((err) => {
        console.log("Checking username error -> " + err);
    })
};

exports.login = async (req, res, next) => {

    // we check if user exists
    await User.checkCredentials(req.body.username, req.body.email).then(async (user) => {

        // we get user data
        const userData = JSON.parse(JSON.stringify(user[0]));

        // if it is not empty user exists
        if (userData.length != 0) {

            // we compare passwords, if they match we generate JWT token
            if (await User.comparePasswords(req.body.password, userData[0].password)) {

                // create tokens when user logins
                const tokens = await jwtMiddleware.createToken(userData[0])

                // we return tokens to user
                res.status(200).json(tokens);
            }
            else res.send("Passwords do not match")

        } else {
            res.status(200).json("User does not exist. Wrong email.");
        }
    }).catch((error) => {
        console.log('Login erorr -> ' + error);
        res.json("Error logging user.");
    });
};

exports.getUser = async (req, res, next) => {
    const user = await User.fetchUser(req.body.username)
    res.status(200).json(user[0]);
};

exports.getUsers = async (req, res, next) => {
    // we fetch all users and return them
    const allUsers = await User.fetchAllUsers();
    res.status(200).json(allUsers[0]);
};

// we generate new access token
exports.generateAccessToken = async (req, res, next) => {

    // we recieve refresh token
    const refreshToken = req.header('refreshToken');

    // we check if it is empty
    if (refreshToken == null) return res.sendStatus(401);

    // we check if token is still valid
    await jwtMiddleware.validateToken(refreshToken);

    // we return new access token
    res.status(200).header('access-token', await jwtMiddleware.generateNewAccessToken(refreshToken)).json();
}



 // const decoded = jwt.decode(refreshToken);
    // if (await jwtMiddleware.validateRefreshTokenExpirationDate(decoded)) res.sendStatus(401);

                // getting users role to all
                //const userRole = await User.fetchUserRole(userData[0].idUser);
                //const role = JSON.parse(JSON.stringify(userRole)); "role": role[0] 

                //const accessToken = jwt.sign({ "username": userData[0].username, "email": userData[0].email }, process.env.accessKey, { expiresIn: '30s' });
                // const refreshToken = jwt.sign({ "username": userData[0].username, "email": userData[0].email }, process.env.refreshKey, { expiresIn: '15m' });
                //await User.storeRefreshToken(refreshToken, userData[0].username);