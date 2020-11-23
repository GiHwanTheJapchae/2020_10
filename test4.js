var net = require('net');


var server = net.createServer(function (socket) {
    // connection event
    console.log('connected');
    socket.write('receiving..');

    socket.on('data', function (chunk) {
        console.log('received : ',
            chunk.toString());
    });

    socket.on('end', function () {
        console.log('disconnected');
    });
});

server.on('listening', function () {
    console.log('listening..');
});

server.on('close', function () {
    console.log('server closed');
});

server.listen(8080);