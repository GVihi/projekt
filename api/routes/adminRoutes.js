const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const jwtMiddleware = require('../middleware/jsonWebToken');

router.get('/download-photos-from-api', adminController.downloadPhotosAPI);
router.delete('/delete-user/:id', adminController.deleteUser);
router.put('/update-user/:id', adminController.updateUser);
module.exports = router;