const Photo = require('../models/photoModel');
const axios = require('axios');
const download = require('image-downloader');
const { userInfo } = require('os');
const { spawn } = require("child_process");
const User = require('./../models/userModel');

exports.downloadPhotosAPI = async (req, res, next) => {

    axios.get('https://pixabay.com/api/?key=21540947-a79c3cf6d3154343ac17cdeb6&page=3&per_page=200&category=' + req.body.categoryName)
        .then(async (response) => {
            response.data.hits.forEach(async (element) => {
                const options = {
                    url: element.largeImageURL,
                    dest: '/home/projekt/api/test-file/' + element.previewURL.split("/").pop()
                }
                download.image(options)
                    .then(async ({ filename }) => {

                        const photoData = {
                            title: filename.split("/").pop(),
                            path: filename,
                            description: 'Description...'
                        }

                        await Photo.savePhoto(photoData).then(async (createdPhoto) => {

                            await Photo.fetchCategory(req.body.categoryName).then(async (category) => {
                                const category2 = category[0];
                                await Photo.insertPhotoCategoryRelation(createdPhoto[0].insertId, category2[0].idCategory).then((createdRelation) => {
                                }).catch((err) => {
                                    console.log("Relation error -> " + err);
                                })
                            }).catch((err) => {
                                console.log("Fetch tag error -> " + err);
                            })

                            const tags = element.tags.split(',');
                            tags.forEach(async (tagName) => {

                                await Photo.insertTag(tagName).then(async (createdTag) => {
                                }).catch((err) => {
                                    console.log("Inserting tag error-> " + err);
                                })

                                await Photo.fetchTag(tagName).then(async (tag) => {
                                    const tag2 = tag[0];
                                    await Photo.insertPhotoTagRelation(createdPhoto[0].insertId, tag2[0].idTag).then((createdRelation) => {
                                    }).catch((err) => {
                                        console.log("Relation error -> " + err);
                                    })
                                }).catch((err) => {
                                    console.log("Fetch tag error -> " + err);
                                })
                            })
                        }).catch((err) => {
                            console.log("Photo error -> " + err);
                        })
                    })
                    .catch((err) => console.error(err))
            });
            res.json("Relations created");
        })
        .catch(error => {
            console.log(error);
        });


};


exports.deleteUser = async (req, res, next) => {
    const deletedUser = await User.deleteUser(req.params.id).catch((err) => {
        if (err) res.json("Error while deleting.")
    })
    const rows = JSON.parse(JSON.stringify(deletedUser[0]));
    if (rows.affectedRows > 0) res.status(200).json("User with id: " + req.params.id + " was deleted.")
    if (rows.affectedRows == 0) res.status(200).json("User can not be deleted.")
};

exports.updateUser = async (req, res, next) => {
    const fetchedUser = await User.fetchUserById(req.params.id)
    const user = fetchedUser[0];
    const userData = JSON.parse(JSON.stringify(user[0]));

    const newUserData = {
        nickname: req.body.nickname === undefined ? userData.nickname : req.body.nickname,
        age: req.body.age === undefined ? userData.age : req.body.age,
        email: req.body.email === undefined ? userData.email : req.body.email,
        username: req.body.username === undefined ? userData.username : req.body.username,
        userId: req.params.id
    }
    await User.updateUser(newUserData).catch((err) => {
        if (err) console.log("Error while updating"); res.json("Error while updating");
    })
    res.json("Updated.")
}

exports.createPhotosBackup = async (req, res, next) => {

    const photosBackupExec = spawn("./../server-scripts/photos-instant-backup.sh", [""]);

    photosBackupExec.stdout.on("data", data => {
        console.log(`Output: ${data}`);
    });

    photosBackupExec.stderr.on("data", data => {
        console.log(`Data: ${data}`);
    });

    photosBackupExec.on('error', (error) => {
        console.log(`Error: ${error.message}`);
        res.json("Error creating backup." + error.message);
    });

    photosBackupExec.on("close", code => {
        console.log(`Porcess finished with code ${code}`);
        res.json("Backup created");
    });

}