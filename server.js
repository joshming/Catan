const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const loginController = require('./server/controllers/loginController.js');
const lobbyController = require('./server/controllers/lobbyController.js');
const gameController = require('./server/controllers/gameController.js');

const {GameManager} = require("./server/gameManager.js");

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

var GM = new GameManager(io);

loginController(io, GM);
lobbyController(io, GM);
gameController(io, GM);