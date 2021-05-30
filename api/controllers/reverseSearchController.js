const Photo = require('../models/photoModel');
const ReverseSearch = require('../models/reverseSearchModel');
const socket = require('../app'); //import socket  from app.js

exports.searchPhoto = async (req, res, next) => {
    const photoData = {
        title: req.file.filename,
        path: req.file.path,
        description: "Reverse search"
    }
    await Photo.savePhoto(photoData).then(async (insertedPhoto) => {
        await Photo.insertUserPhotoRelation(insertedPhoto[0].insertId, req.params.userId).then(async (resultRelation) => {
            socket.socket.emit("reverse-search", req.file.path);
            socket.socket.on("reverse-search-response", async (response) => {
                const data = {
                    userId: req.params.userId,
                    photoId: insertedPhoto[0].insertId,
                    result: response
                };

                await ReverseSearch.saveReverseSearchResult(data).then((reverseResult) => {
                    res.status(200).json(JSON.parse(response))
                })
            })
            /*
                        await ReverseSearch.saveReverseSearchResult(data).then((reverseResult) => {
                            res.status(200).json("Reverse completed")
                        })*/
        })



    }).catch((err) => {
        res.json(err);
    })
}
