module.exports = function(io, GM){

    io.on('connection', socket => {

        socket.on('getGameMembers', () => {
            //returns members of this socket's game, or empty list if n/a
            var res = {};
            var rooms = Object.keys(socket.rooms);

            if(rooms.length == 1)
                res.members = [];
            else{
                res.members = GM.getGameMembers(rooms[1]);
            }

            io.to(socket.id).emit('isValidGameID', res);
        });

        socket.on('leaveGame', () => {
            //this socket has requested to leave it's game
            var gameID = GM.leaveGame();
            socket.leave(gameID);
        });
      
    });
}