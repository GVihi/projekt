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


exports.insertTag = async (tag) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('INSERT IGNORE  INTO peTags(name) VALUES (?)', [tag], (err) => {
            if (err) reject(err)
        });
        resolve(query);
    });
}

exports.insertPhotoCategoryRelation = async (photoId, categoryId) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('INSERT INTO pePhotosCategories(photoId, categoryId) VALUES (?,?)', [photoId, categoryId], (err) => {
            if (err) reject(err)
        });
        resolve(query);
    });
}

exports.insertPhotoTagRelation = async (photoId, tagId) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('INSERT INTO pePhotoTags (photoId, tagId) VALUES (?,?);',
            [photoId, tagId], (err) => {
                if (err) reject(err)
            });
        resolve(query);
    });
}

exports.fetchTag = async (tagName) => {
    return new Promise((resolve, reject) => {
        const exists = databaseConnection.query('SELECT * FROM peTags WHERE name = ?', [tagName], async (err) => {
            if (err) reject(err);
        });
        resolve(exists);
    });
};

exports.fetchCategory = async (categoryName) => {
    return new Promise((resolve, reject) => {
        const exists = databaseConnection.query('SELECT idCategory FROM peCategory WHERE name = ? ', [categoryName], async (err) => {
            if (err) reject(err);
        });
        resolve(exists);
    });
};

exports.fetchPhotos = async () => {
    return Promise.resolve(databaseConnection.query('SELECT idPhoto, title, path, date FROM pePhotos'));
}

exports.fetchPhotoData = async (photoId) => {
    // vrni commente in tagge , ki so povezani z sliko
    return databaseConnection.query('SELECT * FROM pePhotos WHERE idPhoto = ?', [photoId]);
}

exports.insertComment = async (data) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('INSERT INTO peComments (userId, comment, date) VALUES (?,?,now())', [data.userId, data.comment], (err) => {
            if (err) reject(err)
        });
        resolve(query);
    });
}

exports.insertCommentPhotoRelation = async (photoId, commentId) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('INSERT INTO pePhotoComments (photoId, commentId) VALUES (?,?);',
            [photoId, commentId]);
        resolve(query);
    });
}

exports.fetchPhotoComments = async (photoId) => {
    return databaseConnection.query('SELECT peComments.idComment,peUsers.username, peComments.comment, peComments.date FROM peComments JOIN pePhotoComments ON peComments.idComment = pePhotoComments.commentId JOIN peUsers ON peUsers.idUser = peComments.userId WHERE pePhotoComments.photoId = ?', [photoId]);
}

exports.fetchUserPhotos = async (userId) => {
    return databaseConnection.query('SELECT pePhotos.idPhoto, pePhotos.title, pePhotos.path FROM pePhotos JOIN peUsersPhotos ON pePhotos.idPhoto = peUsersPhotos.photoId WHERE peUsersPhotos.userId = ?', [userId]);
}

exports.insertUserPhotoRelation = async (photoId, userId) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('INSERT INTO peUsersPhotos (photoId, userId) VALUES (?,?);',
            [photoId, userId]);
        resolve(query);
    });
}