var socket = io();

socket.on('debug', (data) => {
    //a simple debug function
    console.log(data);
});

//LOGIN EVENTS

function isValidGameID(gameID){
    //query the sever on if gameID is available
    socket.emit('isValidGameID', {gameID: gameID});
}

socket.on('isValidGameID', data => {
    //data = {gameID: str, isValid: bool}
    //data.isValid true if data.gameID is a valid and unused
    console.log(data);
});

function createGame(gameID, userID, password){
    //ask to create a game with gameID under userID
    socket.emit('createGame', {gameID: gameID, userID: userID, password: password});
}

socket.on('createGame', data => {
    //data = {accepted: bool, gameID: str}
    console.log(data);
    createGameResult(data);
});

function joinGame(gameID, userID, password){
    //ask to join a game with gameID under userID
    socket.emit('joinGame', {gameID: gameID, userID: userID, password: password});
}

socket.on('joinGame', data => {
    //data = {gameID: str, accepted: bool}
    console.log(data);
    joinGameResult(data);
});

//LOBBY EVENTS

function getGameMembers(){
    //get the members of the same game that this player is in
    socket.emit('getGameMembers');
}

socket.on('getGameMembers', data => {
    //data = {members: List[str]}
    //data.members possibly being empty if this call is invalid
    console.log(data);
})

//GAME EVENTS

function leaveGame(){
    //makes a request to leave this player's current game.
    //does not get a response!
    socket.emit('leaveGame');
}

socket.on('getGameState', data => {
    //recieve a game state update from the server
});