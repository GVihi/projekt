const express = require('express');
const photoController = require('../controllers/photoController');
const router = express.Router();
const jwtMiddleware = require('../middleware/jsonWebToken');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') cb(null, true);
    else cb(null, false);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/:userId', upload.single('file'), jwtMiddleware.authenticateToken, photoController.uploadPhoto);
router.delete('/delete/:photoId', jwtMiddleware.authenticateToken, photoController.removePhoto);

router.get('/:userId', jwtMiddleware.authenticateToken, photoController.getUserPhotos)
router.get('/', photoController.getPhotos);
router.get('/details/:photoId', jwtMiddleware.authenticateToken, photoController.getPhotoData2);
router.get('/:photoId/comments', jwtMiddleware.authenticateToken, photoController.getPhotoComments);
router.post('/:photoId/comment/:userId', jwtMiddleware.authenticateToken, photoController.commentPhoto);
router.get('/download/:photoId', jwtMiddleware.authenticateToken, photoController.downloadPhoto)
module.exports = router;