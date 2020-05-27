module.exports = function(io, GM){

    io.on('connection', socket => {

        socket.on('getGameMembers', () => {
            //returns members of this socket's game, or empty list if n/a
            var res = {members: GM.getGameMembers(socket.id)}
            io.to(socket.id).emit('getGameMembers', res);
        });

        socket.on('leaveGame', () => {
            //this socket has requested to leave it's game
            var gameID = GM.leaveGame(socket.id);
            if(gameID)
                socket.leave(gameID);
        });

        socket.on('startGame', () => {
            var gameID = GM.startGame(socket.id);
            if(gameID){
                io.to(gameID).emit('startGame', {accepted: true});
                console.log('started game');
            }
        });
      
    });
}