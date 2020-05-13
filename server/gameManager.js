const {Game} = require("./models/game.js");

class GameManager{
    constructor(){
        this.games = []; //an array of all active games
    }

    createGame(gameID){
        //creates a game and returns its gameID
        var game = this.getGame(gameID);
        if(game)
            return false;

        this.games.push(new Game(gameID));
        return gameID;
    }

    leaveGame(gameID, userID){
        var game = this.getGame(gameID);
        if(!game){
            return false;
        }
    }

    getGame(gameID){
        //returns the game with uuid, or false otherwise
        for(var i = 0; i < this.games.length; i++){
            if(this.games[i].uuid == gameID)
                return this.games[i];
        }
        return false;
    }

}

module.exports = {GameManager};