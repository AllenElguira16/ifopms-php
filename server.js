var express = require("express");
var http = require("https");
var fs = require("fs");

var app = express();
var privateKey = fs.readFileSync('../../apache/cert/www.ifopms.dev/server.key', 'utf8');
var certificate = fs.readFileSync('../../apache/cert/www.ifopms.dev/server.crt', 'utf8');
var credentials = {
    key: privateKey,
    cert: certificate
};
var httpServer = http.Server(credentials, app);

var io = require("socket.io")(httpServer);
var port = 8000;
// var clientAddress = "https://www.repairservicelocator.test";

io.on('connection', function (socket) {
    socket.on('newPortfolio', () => {
        io.emit('newPortfolio');
    });
    socket.on('newComment', () => {
        io.emit('newComment');
    });
    socket.on('updateLike', () => {
        io.emit('updateLike');
    });
    socket.on('loadPortfolio', (file) => {
        // console.log('loadPortfolio');
        io.emit('loadPortfolio', file);
    });
    socket.on('newMessage', () => {
        io.emit('newMessage');
    });
    socket.on('openMsg', () => {
        io.emit('openMsg');
    });
});

httpServer.listen(port, () => {
    console.log("listening on port: " + port);
});