var socket = io();

socket.on('isValidGameID', data => {
    //data = {gameID: str, isValid: bool}
    //data.isValid true if data.gameID is a valid and unused
});

socket.on('createGame', data => {
    
})