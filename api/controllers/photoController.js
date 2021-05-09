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
    /* const photos = await Photo.fetchPhotos().catch((err) => {
         if (err) res.status(200).json("Error occured");
     });
     res.status(200).json(photos[0]);*/

    axios.get('https://pixabay.com/api/?key=21540947-a79c3cf6d3154343ac17cdeb6&image_type=photo')
        .then(response => {
            res.json(response.data);
            response.data.hits.forEach(element => {
                console.log(element)
            });
            //console.log(response.data.hits[0])
        })
        .catch(error => {
            console.log(error);
        });
}

exports.getPhotoData = async (req, res, next) => {
    const photo = await Photo.fetchPhotoData(req.params.photoId).catch((err) => {
        if (err) res.status(200).json("Error occured");
    });
    res.status(200).json(photo[0]);
}


exports.getsPhotosFromAPI = async (req, res, next) => {
    res.status(200).json("sdsads");
}