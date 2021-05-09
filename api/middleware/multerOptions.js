const multer = require('multer');

exports.getStorage = () => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString() + file.originalname);
        }
    });
}

exports.fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') cb(null, true);
    else cb(null, false);
};