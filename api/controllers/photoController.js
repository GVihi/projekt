const Photo = require('../models/photoModel');
const path = require('path');
const PythonShell = require('python-shell').PythonShell;
exports.uploadPhoto = async (req, res, next) => {

    var options = {
        scriptPath: __dirname + '/../helpers/',
        args: [req.file.filename]
    };

    PythonShell.run('getGeolocation.py', options, async function (err, results) {
        if (err)
            throw err;

        console.log('results: %j', results[0]);
        console.log('results: %j', results[1]);

        const photoData = {
            title: req.body.title,
            path: req.file.path,
            description: req.body.description,
            latitude: ((results[0] === "None") ? null : parseFloat(results[0])),
            longitude: ((results[0] === "None") ? null : parseFloat(results[1]))
        }

        await Photo.savePhoto(photoData).then(async (result) => {
            await Photo.insertUserPhotoRelation(result[0].insertId, req.params.userId).then((resultRelation) => {
                res.status(200).json("Image uploaded")
            })
        }).catch((err) => {
            res.json(err);
        })
    });

}

exports.getPhotos = async (req, res, next) => {
    const photos = await Photo.fetchPhotos().catch((err) => {
        if (err) res.status(200).json("Error occured");
    });
    res.status(200).json(photos[0]);
}

exports.getPhotoData = async (req, res, next) => {
    console.log(req.params.photoId)

}

exports.getPhotoData2 = async (req, res, next) => {

    const photo = await Photo.fetchPhotoData(req.params.photoId).catch((err) => {
        if (err) res.status(200).json("Error occured");
    });
    const photo2 = JSON.parse(JSON.stringify(photo[0]));
    res.status(200).json(photo2[0]);
}

exports.getUserPhotos = async (req, res, next) => {

    const userPhotos = await Photo.fetchUserPhotos(req.params.userId).catch((err) => {
        if (err) res.status(200).json("Error occured");
    });
    res.status(200).json(userPhotos[0]);
}

exports.commentPhoto = async (req, res, next) => {
    const comment = {
        userId: req.params.userId,
        comment: req.body.comment,
    }
    await Photo.insertComment(comment).then(async (result) => {
        await Photo.insertCommentPhotoRelation(req.params.photoId, result[0].insertId).then(async (err, response) => {
            res.json("Comment inserted.")
        })
    })
}

exports.getPhotoComments = async (req, res, next) => {
    const comments = await Photo.fetchPhotoComments(req.params.photoId).catch((err) => {
        if (err) res.status(200).json("Error occured");
    });
    res.status(200).json(comments[0]);
}

exports.downloadPhoto = async (req, res, next) => {
    const photo = await Photo.fetchPhotoData(req.params.photoId).catch((err) => {
        if (err) res.status(200).json("Error occured");
    });
    const photo2 = JSON.parse(JSON.stringify(photo[0]));
    res.download(photo2[0].path);
}

exports.removePhoto = async (req, res, next) => {
    console.log(req.params.photoId);
    const deleted = await Photo.deletePhoto(req.params.photoId).catch((err) => {
        if (err) res.json(err)
    })
    const rows = JSON.parse(JSON.stringify(deleted[0]));
    if (rows.affectedRows > 0) res.status(200).json("Photo with id: " + req.params.photoId + " was deleted.")
    if (rows.affectedRows == 0) res.status(200).json("Photo can not be deleted.")
}