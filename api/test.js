const axios = require('axios');
const download = require('image-downloader')



/*
axios.get('https://pixabay.com/api/?key=21540947-a79c3cf6d3154343ac17cdeb6&image_type=photo')
    .then(async (response) => {
        response.data.hits.forEach(async (element) => {
            const tags = element.tags.split(',');

            tags.forEach(async (tag) => {
                console.log(tag)
            })
            /*const options = {
                url: element.largeImageURL,
                dest: '/home/projekt/api/test-file/' + element.previewURL.split("/").pop()
            }
            download.image(options)
                .then(({ filename }) => {
                    console.log('Saved to', filename)
                    console.log(filename.split("/").pop())
                })
                .catch((err) => console.error(err))
        });
    })
    .catch(error => {
        console.log(error);
    });*/