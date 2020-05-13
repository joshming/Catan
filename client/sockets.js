var socket = io();

function isValidGame(gameID){
    //query the sever on if gameID is available
    socket.emit('isValidGane', {gameID: gameID});
}

socket.on('isValidGameID', data => {
    //data = {gameID: str, isValid: bool}
    //data.isValid true if data.gameID is a valid and unused
    console.log(data);
});

socket.on('createGame', data => {
    console.log(data);
});