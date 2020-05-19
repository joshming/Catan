module.exports = function(io, GM){

    io.on('connection', socket => {
      
      socket.on('isValidGameID', (data) => {
        //returns if data.gameID is an unused game name
        //data = {gameID: str}
        var res = {
          gameID: data.gameID,
          isValid: !GM.getGame(data.gameID)
        }
        io.to(socket.id).emit('isValidGameID', res);
        console.log(socket.rooms);
      });
    
      socket.on('createGame', (data) => {
        //this socket requested to create a game
        //data = {gameID: str, userID: str, password: str}
        var game = GM.createGame(data.gameID, socket.id, data.userID, data.password);
        if(game){
          socket.join(data.gameID);
        }
        io.to(socket.id).emit('createGame', {gameID: data.gameID, accepted: !!game});
      });
    
      socket.on('joinGame', (data) => {
        //request to join game, given data.gameID and data.password;
        //data = {gameID: str, userID: str, password: str}
        var result = GM.joinGame(data.gameID, socket.id, data.userID, data.password);
        io.to(socket.id).emit('joinGame', {gameID: data.gameID, accepted: result.accepted, validUserID: result.validUserID});
        
      });
      
    });
}