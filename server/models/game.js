const {Board} = require("./board.js");
const {Player} = require("./player.js");

class Game{

    constructor(gameID, creatorID){

        this.gameID = gameID; //identifying token for this game
        this.players = {}; //object mapping userID to Player object
        this.players[creatorID] = new Player(creatorID, gameID, true); //instantiate the master player

        this.currentPlayer = 0; //index of the player who has the current turn
        this.active = false; //true if this game is started
        
        this.board = new Board() //a representation of the gameboard
        this.timer; //a setTimout object representing the turn time limit

    }

    //PREGAME FUNCTIONS

    joinGame(userID){
        //adds a slave player to this game
        //returns true if player is successfully added
        var player = this.getPlayer(userID)
        if(!player)
            this.players[userID] = new Player(userID, this.gameID, false);
        return !player;
    }

    leaveGame(userID){
        //remove player from this game, returns nothing
        var player = this.getPlayer(userID);
        if(player)
            delete this.players[userID];
    }

    getGameMembers(){
        //returns a list of the userIDs of all players in this game
        return Object.keys(this.players);
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

    isPlayerTurn(userID){
        //return true if is this players turn
        
        //TO BE IMPLEMENTED
    }

    toggleTimer(){
        //sets a timer that starts the next player's turn in 5 minutes
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.nextTurn(), 3000);
    }

    nextTurn(){
        //starts the next player's turn

        //TO BE IMPLEMENTED

        // var nPlayers = this.players.length;
        // if(this.currentPlayer != nPlayers - 1)
        //     this.currentPlayer += 1;
        // else
        //     this.currentPlayer = 0;
        // this.toggleTimer();
    }

    checkWin(){
        //returns userID if that user has won, otherwise return false
        for(var prop in this.players){
            if(this.players[prop].victoryPoints >= 10)
                return this.players[prop].userID;
        }
        return false;
    }

    //GAME ACTION FUNCTIONS

    requestAction(userID, actionName, data){

        if(!this.active)
            return false;

        switch(actionName){
            case "buyRoad":
                return this.buyRoad(userID, data.i, data.j, data.edge);
            case "buySettlement":
                return this.buySettlement(userID, data.i, data.j, data.corner);
            case "buyCity":
                return this.buyCity(userID, data.i, data.j, data.corner);
            case "buyDevelopmentCard":
                return this.buyDevelopmentCard(userID);
            case "requestTrade":
                return this.requestTrade(userID, data.target, data.offer, data.recieve);
        }
    }

    startTurn(){
        //returns a list of two integers between 1-6, representing two die rolls
        const getDie = () => {return Math.floor(Math.random() * 6) + 1};
        return {die1: getDie(), die2: getDie()};
    }

    buyRoad(userID, i, j, edge){
        //Requests to buy road at i, j hex
        //data = {i: int, j: int, edge: int}
        var player = this.getPlayer(userID);
        if(player){
            var cost = {grain: 1, lumber: 0, wool: 0, ore: 0, brick: 1};
            if(player.hasCards(cost)){
                if(this.board.setRoad(userID, i, j, edge)){
                    player.spendCards(cost);
                    return true;
                }
            }
        }
        return false;
    }

    buySettlement(userID, i, j, corner){
        //Requests to buy settlement at i, j hex
        //data = {i: int, j: int, corner: int}
        var player = this.getPlayer(userID);
        if(player){
            var cost = {grain: 1, lumber: 1, wool: 1, ore: 0, brick: 1};
            if(player.hasCards(cost)){
                if(this.board.setSettlement(userID, i, j, edge)){
                    player.spendCards(cost);
                    return true;
                }
            }
        }
    }

    buyCity(userID, i, j, corner){
        //Requests to update to a city at i, j hex
        //data = {i: int, j: int, corner: int}
        var player = this.getPlayer(userID);
        if(player){
            var cost = {grain: 2, lumber: 0, wool: 0, ore: 3, brick: 0};
            if(player.hasCards(cost)){
                if(this.board.setCity(userID, i, j, edge)){
                    player.spendCards(cost);
                    return true;
                }
            }
        }
    }

    buyDevelopmentCard(userID){
        //Requests to buy development card
        var player = this.getPlayer(userID);
        if(player){
            var cost = {grain: 1, lumber: 0, wool: 1, ore: 1, brick: 0};
            if(player.spendCards(cost)){

            }
        }
    }

    endTurn(userID){

    }

    requestTrade(userID, target, offer, recieve){

    }

    export(){
        //return an object limited to everything the clients need to know about the game state
    }

    //HELPERS

    getPlayer(userID){
        if(this.players[userID] == null)
            return false;
        return this.players[userID]
    }

    addCards(userID, cards){
        //gives this player these cards
        //cards = {grain: int, lumber: int, wool: int, ore: int, brick: int}
    }

    spendCards(userID, cards){
        //spends these cards, or returns false
        //cards = {grain: int, lumber: int, wool: int, ore: int, brick: int}
    }

}

module.exports = {Game};