const {Board} = require("./board.js");

class Game{
    constructor(uuid){
        this.uuid = uuid; //identifying token for this game
        this.players = []; //a list of players
        this.currentPlayer = 0; //index of the player who has the current turn
        this.active = false; //true if this game is started
        
        this.board = new Board() //a representation of the gameboard
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