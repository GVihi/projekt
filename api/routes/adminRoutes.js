const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const jwtMiddleware = require('../middleware/jsonWebToken');

router.get('/download-photos-from-api', jwtMiddleware.authenticateToken, adminController.downloadPhotosAPI);
//router.get('/create-backup-mysql', adminController.createMysqlBackup)
router.get('/create-backup-photos', jwtMiddleware.authenticateToken, adminController.createPhotosBackup)

router.delete('/delete-user/:id', jwtMiddleware.authenticateToken, adminController.deleteUser);
router.put('/update-user/:id', jwtMiddleware.authenticateToken, adminController.updateUser);

// changepriviliges ->_userid, idpriviliege 
// v modeli še fetch all privliges


module.exports = router;