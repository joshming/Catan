class Player{
    constructor(userID, gameID, isAdmin){
        this.userID = userID;
        this.gameID = gameID;
        this.isAdmin = isAdmin;
        this.victoryPoints = 0; //int describing number of victory points this player has
        this.cards = {grain: 0, lumber: 0, wool: 0, ore: 0, brick: 0}; //array of resource cards
        this.developmentCards = [];
    }

    hasCards(cards){
        //returns true if this player has all these cards
        //cards = {grain: int, lumber: int, wool: int, ore: int, brick: int};

        for(prop in this.cards){
            if(this.cards[prop] < cards[prop]){
                return false;
            }
        }
        return true;
    }

    addCards(cards){
        //adds these cards to this player's cards. Returns none
        //cards = {grain: int, lumber: int, wool: int, ore: int, brick: int};
        
        for(prop in this.cards){
            this.cards[prop] += cards[prop]
        }
    }

    spendCards(cards){
        //spends and subtracts these cards, assuming this player has enough cards
        //cards = {grain: int, lumber: int, wool: int, ore: int, brick: int};

        for(prop in this.cards){
            this.cards[prop] -= cards[prop];
        }
    }
}

module.exports = {Player}