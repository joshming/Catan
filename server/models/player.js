class Player{
    constructor(userID, gameID, isAdmin){
        this.userID = userID;
        this.gameID = gameID;
        this.isAdmin = isAdmin;
        this.victoryPoints = 0; //int describing number of victory points this player has
        this.cards = []; //array of resource cards
    }
}

module.exports = {Player}