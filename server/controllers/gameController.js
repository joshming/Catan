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
            GM.requestAction(socket.id, 'buyRoad', data);
        });

        socket.on('buySettlement', (data) => {
            //request to buy a settlement at this corner
            //data = {i: int, j: int, corner: int}
            GM.requestAction(socket.id, 'buySettlement', data);
        })

        socket.on('buyCity', (data) => {
            //request to buy a settlement at this corner
            //data = {i: int, j: int, corner: int}
            GM.requestAction(socket.id, 'buyCity', data);
        });

        socket.on('requestTrade', (data) => {
            // request to trade with bank
            // data = {
            //     target: str
            //     offer: {grain: int, lumber: int, wool: int, ore: int, brick: int}, 
            //     recieve: {grain: int, lumber: int, wool: int, ore: int, brick: int}
            // }
            GM.requestAction(socket.id, 'requestTrade', data);
        });

        socket.on('endTurn', () => {
            //request to end this player's turn
            GM.requestAction(socket.id, 'endTurn', data);
        });
 
    });
}