var child_process = require('child_process');
var numchild = require('os').cpus().length;
var done = 0;
let numOfImages = 15;
for (var i = 0, j = 0; i < numchild; i++, j += numOfImages) {
    var child = child_process.fork('./child');
    child.send({ j: j, rows: "", folder: 'test-set', num: numOfImages });

    child.on('message', function (message) {
        console.log('Message:', message);
        done++;
        if (done === numchild) {
            console.log('All processes finished.');

        }
    });
}

