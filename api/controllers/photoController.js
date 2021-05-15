const Photo = require('../models/photoModel');
const axios = require('axios');
const fs = require('fs');

exports.uploadPhoto = async (req, res, next) => {
    const photoData = {
        title: req.body.title,
        path: req.file.path,
        description: req.body.description
    }
    await Photo.savePhoto(photoData).then((result) => {
        res.status(200).json("Image uploaded")
    }).catch((err) => {
        res.json(err);
    })

}


exports.getPhotos = async (req, res, next) => {
    const photos = await Photo.fetchPhotos().catch((err) => {
        if (err) res.status(200).json("Error occured");
    });
    res.status(200).json(photos[0]);
}

exports.getPhotoData = async (req, res, next) => {
    const photo = await Photo.fetchPhotoData(req.params.photoId).catch((err) => {
        if (err) res.status(200).json("Error occured");
    });
    res.status(200).json(photo[0]);
}


exports.getsPhotosFromAPI = async (req, res, next) => {
    res.send("200")
}