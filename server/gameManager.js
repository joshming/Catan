const {Game} = require("./models/game.js");

class GameManager{
    constructor(){
        this.games = {}; //a dict mapping gameID to the game object
        this.auth = {}; //a dict mapping gameID to passwords
    }

    createGame(gameID, userID, password){
        //creates a game and returns its gameID, or false if gameID is taken
        var game = this.getGame(gameID);
        if(game)
            //return false if a game already exists with this gameID
            return false;

        this.games[gameID] = new Game(gameID, userID);
        this.auth[gameID] = password;
        return gameID;
    }

    joinGame(gameID, userID, password){
        //returns true if userID joined the game with this gameID
        var game = this.getGame(gameID);
        if(game){
            if(this.auth[gameID] === password){
                var result = game.joinGame(userID);
                return result;
            }
        }
        return false;
    }

    leaveGame(gameID, userID){
        var game = this.getGame(gameID)
        if(game){
            game.leaveGame(userID);
        }
        return false;
    }

    startGame(gameID){
        var game = this.getGame(gameID)
        if(game)
            game.startGame()
            return true;
        return false;
    }

    getGame(gameID){
        //returns the game with this gameID, or false otherwise
        var gameIDs = Object.keys(this.games);
        for(var i = 0; i < gameIDs.length; i++){
            if(gameIDs[i] == gameID)
                return this.games[gameID];
        }
        return false;
    }

    getGameMembers(gameID){
        var game = this.getGame(gameID);
        if(game){
            return game.getGameMembers();
        }
        return [];
    }

}

module.exports = {GameManager};