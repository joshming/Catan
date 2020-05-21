class ResponseSender{

    constructor(io){
        this.io = io;
    }

    sendGameState(gameID, gameState){
        //sends gamestate to all members of gameID
        this.io.to(gameID).emit(gameState);
    }

    send(socketID, actionName, data){
        this.io.to(socketID).emit(actionName, data);
    }

}

module.exports = {ResponseSender};