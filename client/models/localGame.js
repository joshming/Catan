class LocalGame{

    constructor(playerIDs, boardData){

        this.players = {}; //object mapping userID to Player object
        for(var i = 0; i < playerIDs.length; i++){
            this.players[playerIDs[i]] = new LocalPlayer(playerIDs[i]);
        }

        this.board = new Board(boardData) //a representation of the gameboard

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

    endTurn(){
        //end this player's turn. To be implemented
    }

    //GAME ACTION FUNCTIONS

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