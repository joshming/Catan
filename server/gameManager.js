const {ResponseSender} = require('./controllers/responseSender.js');
const {Game} = require("./models/game.js");
const {Player} = require("./models/player.js");

class GameManager{
    constructor(io){
        this.res = new ResponseSender(io);
        this.games = {}; //a dict mapping gameID to the game object
        this.players = {}; //a dict mapping socketID to player object
        this.auth = {}; //a dict mapping gameID to passwords
    }

    //GAME MANAGEMENT FUNCTIONS

    createGame(gameID, socketID, userID, password){
        //creates a game and returns its gameID, or false if gameID is taken
        var game = this.getGame(gameID);
        if(game)
            //return false if a game already exists with this gameID
            return false;

        this.games[gameID] = new Game(gameID, userID);
        this.players[socketID] = new Player(userID, gameID, true);
        this.auth[gameID] = password;
        return gameID;
    }

    joinGame(gameID, socketID, userID, password){
        //returns true if userID joined the game with this gameID
        var game = this.getGame(gameID);
        if(game){
            if(this.auth[gameID] === password){
                var result = game.joinGame(userID);
                if(result){
                    this.players[socketID] = new Player(userID, gameID, false);
                }
                return result;
            }
        }
        return false;
    }

    leaveGame(socketID){
        //return gameID that this player left, otherwise return false
        var player = this.getPlayer(socketID);
        if(!player)
            return false;

        var gameID = player.gameID;
        var game = this.getGame(gameID)
        if(game){
            game.leaveGame(userID);
            return gameID;
        }
        return false;
    }

    startGame(socketID){
        var player = this.getPlayer(socketID);
        if(player){
            if(player.isAdmin){
                var game = this.getGame(gameID)
                if(game){
                    game.startGame();
                    return true;
                }
            }
        }
        return false;
    }

    //PROCESS INPUT FUNCTIONS

    requestAction(socketID, actionName, data){
        //relay a requested action to the appropriate game
        var player = this.getPlayer(socketID)
        if(player){
            var game = this.getGame(player.gameID)
            if(game){
                game.requestAction(player.userID, actionName, data);
            }
        }
    }

    //GETTER FUNCTIONS

    getGame(gameID){
        //returns the game with this gameID, or false otherwise
        var game = this.games[gameID]
        if(game == null)
            return false;
        return game;
    }

    getPlayer(socketID){
        //returns the player object associated with this socketID, or false otherwise
        if(this.players[socketID] == null)
            return false;
        return this.players[socketID];
    }

    getGameMembers(socketID){
        //get a list of players in this player's game
        var player = this.getPlayer(socketID)
        if(player){
            var game = this.getGame(player.gameID);
            if(game){
                return game.getGameMembers();
            }
        }
        return [];
    }

}

module.exports = {GameManager};