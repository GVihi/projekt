
const port = 3001;
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;


if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });

} else {

    const express = require('express');
    const app = express();
    const socket = require('socket.io')
    const cors = require('cors');
    const imageFunctions = require('./python-functions/imageFunctions');

    app.use(cors());

    const server = app.listen(port, () => {
        console.log("Image processing server listening on port" + port)
    })

    const io = socket(server, {
        cors: {
            origin: "http://139.177.182.18:8080"
        }
    });


    io.on('connection', (socket) => {
        console.log("Client connected " + socket.id);

        socket.on('data', (data) => {
            imageFunctions.resizeImage();
            console.log(data)
            socket.emit('message', 'to je moj message')

        })

        socket.on('resize-image', () => {
            imageFunctions.resizeImage();
        })
    });
}










