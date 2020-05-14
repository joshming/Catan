const {Board} = require("./board.js");
const {Player} = require("./player.js");

class Game{
    constructor(gameID, creatorID){
        this.gameID = gameID; //identifying token for this game
        this.players = [new Player(creatorID)]; //a list of players
        this.currentPlayer = 0; //index of the player who has the current turn
        this.active = false; //true if this game is started
        
        this.board = new Board() //a representation of the gameboard
    }

    joinGame(playerID){
        //returns true if this player can be added to this game
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].playerID == playerID)
                return false;
        }
        this.players.push(new Player(playerID));
        return true;
    }

    leaveGame(playerID){
        //remove player from this game
        for(var i = 0; i < this.players.length; i++){
            var temp = this.players[i];
            if(temp.playerID == playerID){
                this.players.pop(i);
            }
        }
    }

    getGameMembers(){
        var members = [];
        for(var i = 0; i < this.players.length; i++){
            members.push(this.players[i].userID);
        }
        return members;
    }

    isPlayerTurn(playerID){
        //return true if is this players turn
        return this.players[this.currentPlayer].id == playerID;
    }

    rollDie(){

    }

    buyRoad(){

    }

    buySettlement(){

    }

    buyCity(){

    }

    buyDevelopmentCard(){

    }

    endTurn(){

    }

    bankTrade(){

    }

    portTrade(){

    }

    playerTrade(){

    }

    export(){
        //return an object limited to everything the clients need to know about the game state
    }
}

module.exports = {Game};