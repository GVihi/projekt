const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const jwtMiddleware = require('../middleware/jsonWebToken');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/generate-access-token', userController.generateAccessToken)


router.get('/get-user', jwtMiddleware.authenticateToken, userController.getUser)
router.get('/get-users', jwtMiddleware.authenticateToken, userController.getUsers)
router.get('/get-user-settings', jwtMiddleware.authenticateToken, userController.getUsers)

module.exports = router;