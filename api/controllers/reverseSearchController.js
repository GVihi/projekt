const Photo = require('../models/photoModel');
const ReverseSearch = require('../models/reverseSearchModel');
const socket = require('../app'); //import socket  from app.js

exports.searchPhoto = async (req, res, next) => {
    const photoData = {
        title: req.body.title,
        path: req.file.path,
        description: req.body.description
    }
    await Photo.savePhoto(photoData).then(async (result) => {

        socket.socket.emit("reverse-search", req.file.path);
        socket.socket.on("reverse-search-response", async (response) => {
            const data = {
                userId: 4,
                photoId: result[0].insertId,
                result: response
            };

            await ReverseSearch.saveReverseSearchResult(data).then((reverseResult) => {
                res.status(200).json(JSON.parse(response))
            })
        })

    }).catch((err) => {
        res.json(err);
    })
}
