module.exports = function(io, GM){

    io.on('connection', socket => {

        socket.on('leaveGame', () => {
            //this socket has requested to leave it's game
            var gameID = GM.leaveGame();
            socket.leave(gameID);
        });

        socket.on('buyRoad', (data) => {
            //request to buy a road at this edge
            //data = {i: int, j: int, edge: int}
        });

        socket.on('buySettlement', (data) => {
            //request to buy a settlement at this corner
            //data = {i: int, j: int, corner: int}
        })

        socket.on('buyCity', (data) => {
            //request to buy a settlement at this corner
            //data = {i: int, j: int, corner: int}
        });

        socket.on('requestTrade', (data) => {
            // request to trade with bank
            // data = {
            //     target: str
            //     offer: {grain: int, lumber: int, wool: int, ore: int, brick: int}, 
            //     recieve: {grain: int, lumber: int, wool: int, ore: int, brick: int}
            // }
        });
 
    });
}