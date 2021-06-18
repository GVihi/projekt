const axios = require('axios');
const download = require('image-downloader')
var fs = require('fs');
const async = require('async')

class Downloader {
    constructor(folder) {
        this.q = async.queue(this.singleFile, 1);
        this.folder = folder;

        this.q.drain(function () {
            console.log('all items have been processed');
        });

        this.q.error(function (err, task) {
            console.error('task experienced an error', task);
        });
    }

    downloadFiles(links) {
        for (let link of links) {
            this.q.push(link);
        }
    }

    singleFile(link, cb) {
        if (!fs.existsSync("./dataset/" + link.folder + "/" + link.name)) {
            fs.mkdirSync("./dataset/" + link.folder + "/" + link.name);
        }
        const options = {
            url: link.url,
            dest: './dataset/' + link.folder + '/' + link.name + '/' + link.name + '_' + ("000" + link.index1).slice(-4) + ".jpg"
        }
        download.image(options)
            .then(async ({ filename }) => {
                console.log(filename + " downloaded")
                cb();
            }).catch((err) => console.error(err))
    }
}


process.on('message', function (message) {

    const result = [{ name: 'lion' }, { name: 'frog' }, { name: 'sea' }, { name: 'bike' },
    { name: 'truck' }, { name: 'horse' }]
    //result.forEach((res)=> {res.name=res.name.trim()})
    result.forEach((res) => {
        if (!fs.existsSync("./dataset/" + message.folder + "/" + res.name)) {
            fs.mkdirSync("./dataset/" + message.folder + "/" + res.name);

        }
        axios.get('https://pixabay.com/api/?key=21540947-a79c3cf6d3154343ac17cdeb6&page=1&per_page=' + message.num + '&q=' + res.name)
            .then(async (response) => {
                let images = []
                let index1 = message.j;
                response.data.hits.forEach(async (element) => {
                    const image = {
                        url: element.largeImageURL,
                        index1: index1,
                        name: res.name,
                        folder: message.folder
                    }
                    images.push(image)
                    index1++;
                });
                const dl = new Downloader("train-set");
                dl.downloadFiles(images);

            })
            .catch(error => {
                console.log(error);
            });
    })
    console.log(result);

    process.send({
        child: process.pid,
        result: message + 1
    });
    process.disconnect();

});


