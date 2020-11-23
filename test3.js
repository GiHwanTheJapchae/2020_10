var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var net = require('net');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/test3.html');
});

var socket_listener = net.createServer(function (socket) {
    // connection event
    console.log('connected');
    socket.write('receiving..');

    socket.on('data', function (chunk) {
        console.log('received : ',
            chunk.toString());
        //socket_inner.emit('data_html', chunk.toString());

        io.on('connection', function (socket_inner) {
            console.log('sended');
            socket_inner.emit('chat', chunk.toString());
        });

    });

    socket.on('end', function () {
        console.log('disconnected');
    });
});

socket_listener.on('listening', function () {
    console.log('socket listening..');
});

socket_listener.on('close', function () {
    console.log('server closed');
});

socket_listener.listen(22043);


io.on('connection', function (socket) {

    socket.on('login', function (data) {
        console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);

        socket.name = data.name;
        socket.userid = data.userid;

        io.emit('login', data.name);
    });

    socket.on('chat', function (data) {
        
        console.log('Message from %s: %s', socket.name, data.msg);
        

        var msg = {
            from: {
                name: socket.name,
                userid: socket.userid
            },
            msg: data.msg
        };

        socket.broadcast.emit('chat', msg);



    });

    socket.on('forceDisconnect', function () {
        socket.disconnect();
    })

    socket.on('disconnect', function () {
        console.log('user disconnected: ' + socket.name);
    });
});

server.listen(8080, function () {
    console.log('Socket IO server listening on port 3000');
});