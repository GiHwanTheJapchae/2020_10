//const cv = require('opencv4nodejs');
var path = require('path');
var express = require('express');
var app = express();
var http = require('http')
var socketio = require('socket.io');
var net = require('net');
var rcdata_send = null;
var rcdata_json = null;

app.get('/', (req, res) => {
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

//app.use(bodyParser.urlencoded({ extended: false }));
/*
var port = 80;
app.listen(port, function () {
    console.log('server on');
});

*/
var port = 8080;
/*
app.listen(port, function () {
    console.log('server on');
});
*/
var httpServer = http.createServer(app).listen(port, function(req,res){
    console.log('server on');
});

var server = net.createServer(function (socket) {
    // connection event
    console.log('connected: server');

    socket.on('data', function (data) {
        var temp = data
        console.log('received : ',
            temp.toString());
        //data_str = data.toJSON();
        //data_str2 = JSON.stringify(data);
        //rcdata = JSON.parse(data.toString());
        //rcdata = data.toJSON();
        //rcdata = JSON.parse(data.toString());
        rcdata_json = data.toString();
        rcdata_json.replace(/\n/gi, '\\n');
        rcdata_json.replace(/\r/gi, '\\r');

        rcdata_send = JSON.parse(rcdata_json);
        io.sockets.emit('chat', rcdata_send);
        socket.write('log received');


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

server.listen(2204);


var io = socketio.listen(httpServer);

io.sockets.on('connection', function (socket) {
    console.log('client connected');
    socket.on('sMsg', function (data) {
        io.sockets.emit('chat', data);
        console.log(data);


    });
});
