const Photo = require('../models/photoModel');


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


// comment insert
// comment photo -> userid, photoId
// prvo comment insrtComment v model
// insertComemntPhoto Relation 

// izpis vseh slik dolocenegea uporabnika

// izpis vseh commentov za sliko

exports.commentPhoto = async (req, res, next) => {

    const comment = {
        userId: req.params.userId,
        comment: req.body.comment,
    }
    console.log(comment)

    await Photo.insertComment(comment).then(async (result) => {
        await Photo.insertCommentPhotoRelation(req.params.photoId, result[0].insertId).then(async (err, response) => {
            res.json("Comment inserted.")
        })
    })

}