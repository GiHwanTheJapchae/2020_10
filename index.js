//var cv = require('opencv4nodejs');
var path = require('path');
var express = require('express');
var app = express();
var http = require('http')
var socketio = require('socket.io');
var net = require('net');
var rcdata_send = null;
var rcimg = null;
//var sizeof = require('object-sizeof');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/', function (req, res) {
    res.send('POST');
});

app.put('/user', function (req, res) {
    res.send('PUT');
});

app.use(express.static(__dirname + '/public'));


var port = 8080;

var httpServer = http.createServer(app).listen(port, function (req, res) {
    console.log('server on');
});

var server_log = net.createServer(function (socket) {
    // connection event
    console.log('connected: server_log');

    socket.on('data', function (data) {
        var temp = data
        console.log('received : ',
            temp.toString());
        rcimg = data.toString();
        rcimg.replace(/\n/gi, '\\n');
        rcimg.replace(/\r/gi, '\\r');

        rcdata_send = JSON.parse(rcimg);
        io.sockets.emit('chat', rcdata_send);
        socket.write('received');


    });

    socket.on('end', function () {
        console.log('disconnected');
    });
});

server_log.on('listening', function () {
    console.log('listening..');
});

server_log.on('close', function () {
    console.log('server closed');
});

server_log.listen(22046);

var server_img = net.createServer(function (socket) {
    // connection event
    console.log('connected: server');

    socket.on('data', function (data) {
        //rcimg = data.toString();
        //rcimg.replace(/\n/gi, '\\n');
        //rcimg.replace(/\r/gi, '\\r');
        //frame = cv.imencode('.jpg', data).toString('base64');
        var frame = data.toString('base64');
        io.sockets.emit('image', data.toString());

    });

    socket.on('end', function () {
        console.log('disconnected');
    });
});

server_img.on('listening', function () {
    console.log('listening..');
});

server_img.on('close', function () {
    console.log('server closed');
});

server_img.listen(22043);

var io = socketio.listen(httpServer);

io.sockets.on('connection', function (socket) {
    console.log('client connected');
    socket.on('sMsg', function (data) {
        io.sockets.emit('chat', data);
        console.log(data);


    });
});







/*var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var fs = require('fs');
var socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));



*/



/*
old_code
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
    res.send('POST');
});

// accept PUT request at /user
app.put('/user', function (req, res) {
    res.send('PUT');
});

var port = 80;
app.listen(port, function () {
    console.log('server on');
});

var io = socketio.listen(port);

io.sockets.on('connection', function (socket) {
    socket.on('sMsg', function (data) {
        io.sockets.emit('rMsg', data);
    });
});
*/