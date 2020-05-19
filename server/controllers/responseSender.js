class ResponseSender{

    constructor(io){
        this.io = io;
    }

    sendGameState(gameID, gameState){
        //sends gamestate to all members of gameID
        this.io.to(gameID).emit(gameState);
    }

}

module.exports = {ResponseSender};