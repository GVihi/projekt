const databaseConnection = require('../util/databaseConnection');

exports.savePhoto = async (photoData) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('INSERT INTO pePhotos (title, path, date, description) VALUES (?,?,now(),?)',
            [photoData.title, photoData.path, photoData.description], (err) => {
                if (err) reject(err)
            });
        resolve(query);
    });
}

exports.fetchPhotos = async () => {
    return Promise.resolve(databaseConnection.query('SELECT * FROM pePhotos'));
}

exports.fetchPhotoData = async (photoId) => {
    return databaseConnection.query('SELECT * FROM pePhotos WHERE idPhoto = ?', [photoId]);
}