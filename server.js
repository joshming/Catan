var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

const {ServerController} = require("./server/serverController.js");

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.use('/', express.static(__dirname + '/client'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

io.on('connection', socket => {

  socket.on('reqValidGameID', (data) => {
    //returns if data.gameID is an unused game name
    var res = {isValid: !controller.getGame(data.gameID)}
    io.to(socket.id).emit('resValidGameID', res);
  });

  socket.on('createGame', (data) => {
    //this socket requested to create a game
    var gameID = controller.createGame(data.gameID, data.password);
    socket.join(gameID);
    io.to(socket.id).emit('createGame', {gameID: gameID});
  });

  socket.on('leaveGame', () => {
    //this socket has requested to leave it's game
    var gameID = controller.leaveGame();
    socket.leave(gameID);
  });

  socket.on('joinGame', (data) => {
    //request to join game, given data.gameID and data.password;
    var result = controller.joinGame(data.gameID, data.password);
    io.to(socket.id).emit('joinGame', {accepted: result});
  });

});

var controller = new ServerController(io);