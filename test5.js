var express = require('express');
var app = express();
var server = require('http').createServer(app);
var net = require('net');
var bodyParser = require('body-parser')
var received_data = null;

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));



app.get('/', function (req, res) {
    //    res.sendFile(__dirname + '/test5.html');
    //var = image;
    //<div><%= image_html %></div>
});


app.get('/', function(req,res){
    res.render('test6', {rcdata:received_data, obj:received_data})

})

app.listen(80, function(){
    console.log('client listening');
});

/*
var client_socket = require('socket.io')(server);

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
client_socket.on('connection', function (socket_2) {

    // 클라이언트로부터의 메시지가 수신되면
    socket_2.on('chat', function (data) {

        // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
        socket_2.broadcast.emit('chat', data);
        socket_2.emit('chat', received_data2);

        // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
        // socket.emit('s2c chat', msg);

        // 접속된 모든 클라이언트에게 메시지를 전송한다
        // io.emit('s2c chat', msg);

        // 특정 클라이언트에게만 메시지를 전송한다
        // io.to(id).emit('s2c chat', data);
    });
    socket_2.on('forceDisconnect', function () {
        socket_2.disconnect();
    })

    socket_2.on('disconnect', function () {
        console.log('user disconnected: ' + socket_2.name);
    });
});

server.listen(80, function () {
    console.log('80 ready');
});

*/

var string_socket = net.createServer(function (socket_1) {
    // connection event
    console.log('connected');
    socket_1.write('receiving..');

    socket_1.on('data', function (chunk) {
        console.log('received : ', chunk.toString());
        received_data = chunk.toString();

    });

    socket_1.on('end', function () {
        console.log('disconnected');
    });
});

string_socket.on('listening', function () {
    console.log('22043 ready..');
});

string_socket.on('close', function () {
    console.log('server closed');
});

string_socket.listen(22043);