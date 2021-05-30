const databaseConnection = require('../util/databaseConnection');

exports.saveReverseSearchResult = async (data) => {
    return new Promise((resolve, reject) => {
        const query = databaseConnection.query('INSERT INTO peReverseSearchResults (userId, photoId, results, date) VALUES (?,?,?,now())',
            [data.userId, data.photoId, data.result], (err) => {
                if (err) reject(err)
            });
        resolve(query);
    });
}