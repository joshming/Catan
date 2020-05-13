module.exports = function(io, controller){

    io.on('connection', socket => {

        socket.on('isValidGameID', (data) => {
          //returns if data.gameID is an unused game name
          //data = {gameID: str}
          var res = {
            gameID: data.gameID,
            isValid: !controller.getGame(data.gameID)
          }
          io.to(socket.id).emit('isValidGameID', res);
      
        });
      
        socket.on('createGame', (data) => {
          //this socket requested to create a game
          //data = {gameID: str, password: str}
          var game = controller.createGame(data.gameID, data.password);
      
          if(game){
            socket.join(data.gameID);
          }
          io.to(socket.id).emit('createGame', {isValid: !!game, gameID: data.gameID});
      
        });
      
        socket.on('leaveGame', () => {
          //this socket has requested to leave it's game
          var gameID = controller.leaveGame();
          socket.leave(gameID);
        });
      
        socket.on('joinGame', (data) => {
          //request to join game, given data.gameID and data.password;
          //data = {gameID: str, password: str}
          var result = controller.joinGame(data.gameID, data.password);
          io.to(socket.id).emit('joinGame', {gameID: data.gameID, accepted: result});
          
        });
      
    });
}