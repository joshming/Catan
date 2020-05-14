module.exports = function(io, GM){

    io.on('connection', socket => {

        socket.on('leaveGame', () => {
            //this socket has requested to leave it's game
            var gameID = GM.leaveGame();
            socket.leave(gameID);
        });
        
    });
}