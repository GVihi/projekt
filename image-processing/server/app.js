const port = 3001;
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;



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
        origin: "*"
    }
});

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



}







var cluster = require('cluster');
var os = require('os');

if (cluster.isMaster) {
    // we create a HTTP server, but we do not use listen
    // that way, we have a socket.io server that doesn't accept connections
    var server = require('http').createServer();
    var io = require('socket.io').listen(server);

    var RedisStore = require('socket.io/lib/stores/redis');
    var redis = require('socket.io/node_modules/redis');

    io.set('store', new RedisStore({
        redisPub: redis.createClient(),
        redisSub: redis.createClient(),
        redisClient: redis.createClient()
    }));

    setInterval(function () {
        // all workers will receive this in Redis, and emit
        io.sockets.emit('data', 'payload');
    }, 1000);

    for (var i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }

    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
}

if (cluster.isWorker) {
    var express = require('express');
    var app = express();

    var http = require('http');
    var server = http.createServer(app);
    var io = require('socket.io').listen(server);

    var RedisStore = require('socket.io/lib/stores/redis');
    var redis = require('socket.io/node_modules/redis');

    io.set('store', new RedisStore({
        redisPub: redis.createClient(),
        redisSub: redis.createClient(),
        redisClient: redis.createClient()
    }));

    io.on('connection', (socket) => {
        console.log("Client connected " + socket.id);


        socket.on('reverse-search', async (data) => {
            console.log(data)
            socket.emit('reverse-search-response', '{ "photoId": 8, "similarity": 66.55 }')
        })



        socket.on('data', (data) => {
            imageFunctions.resizeImage();
            console.log(data)
            socket.emit('message', 'to je moj message')

        })

        socket.on('resize-image', () => {
            imageFunctions.resizeImage();
        })
    });

    app.listen(80);
}
