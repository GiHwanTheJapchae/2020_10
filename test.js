const cv = require('opencv4nodejs');
var path = require('path');
var express = require('express');
var app = express();
var socketio = require('socket.io');

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'test2.html'));
});

// accept POST request on the homepage
app.post('/', function (req, res) {
    res.send('POST');
});

// accept PUT request at /user
app.put('/user', function (req, res) {
    res.send('PUT');
});

var port = 8080;
app.listen(port, function () {
    console.log('server on');
});

var io = socketio.listen(2204);

io.sockets.on('connection', function (socket) {
    socket.on('sMsg', function (data) {
        io.sockets.emit('rMsg', data);
    });
});