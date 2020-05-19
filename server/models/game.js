const {Board} = require("./board.js");
const {Player} = require("./player.js");

class Game{
    constructor(gameID, creatorID){
        this.gameID = gameID; //identifying token for this game
        this.players = [new Player(creatorID, gameID, true)]; //a list of players
        this.currentPlayer = 0; //index of the player who has the current turn
        this.active = false; //true if this game is started
        
        this.board = new Board() //a representation of the gameboard
        this.timer; //a setTimout object representing the turn time limit
    }

    //PREGAME FUNCTIONS

    joinGame(userID){
        //returns true if this player can be added to this game
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].userID == userID)
                return false;
        }
        this.players.push(new Player(userID));
        return true;
    }

    leaveGame(userID){
        //remove player from this game
        for(var i = 0; i < this.players.length; i++){
            var temp = this.players[i];
            if(temp.userID == userID){
                this.players.pop(i);
            }
        }
    }

    getGameMembers(){
        //returns a list of the userIDs of all players in this game
        var members = [];
        for(var i = 0; i < this.players.length; i++){
            members.push(this.players[i].userID);
        }
        return members;
    }

    //GAME STATE FUNCTIONS

    startGame(){
        //starts this game
        this.active = true;
        this.toggleTimer();
    }

    endGame(){
        //ends this game
        this.active = true;
    }

    isPlayerTurn(playerID){
        //return true if is this players turn
        return this.players[this.currentPlayer].id == playerID;
    }

    toggleTimer(){
        //sets a timer that starts the next player's turn in 5 minutes
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.nextTurn(), 3000);
    }

    nextTurn(){
        //starts the next player's turn
        var nPlayers = this.players.length;
        if(this.currentPlayer != nPlayers - 1)
            this.currentPlayer += 1;
        else
            this.currentPlayer = 0;
        this.toggleTimer();
    }

    checkWin(){
        //returns userID if that user has won, otherwise return false
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].victoryPoints >= 10)
                return this.players[i].userID;
        }
        return false;
    }

    //GAME ACTION FUNCTIONS

    action(actionType, userID){

    }

    rollDie(){
        //returns a list of two integers between 1-6, representing two die rolls
        const getDie = () => {return Math.floor(Math.random() * 6) + 1};
        return [getDie(), getDie()];
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