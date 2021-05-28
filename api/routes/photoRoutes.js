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

router.post('/', upload.single('file'), photoController.uploadPhoto);


router.get('/', photoController.getPhotos);
router.get('/:photoId', photoController.getPhotoData);

router.post('/:photoId/comment/:userId', photoController.commentPhoto);
module.exports = router;