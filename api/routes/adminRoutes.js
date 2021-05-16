const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const jwtMiddleware = require('../middleware/jsonWebToken');

router.get('/download-photos-from-api', adminController.downloadPhotosAPI);
//router.get('/create-backup-mysql', adminController.createMysqlBackup)
router.get('/create-backup-photos', adminController.createPhotosBackup)

router.delete('/delete-user/:id', adminController.deleteUser);
router.put('/update-user/:id', adminController.updateUser);



module.exports = router;