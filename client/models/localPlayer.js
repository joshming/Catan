class LocalPlayer{
    constructor(playerID, isClient){
        this.playerID = playerID;
        this.isClient = isClient;
        this.victoryPoints = 0;
        this.cards = {grain: 0, lumber: 0, wool: 0, ore: 0, brick: 0, unknown: 0}; //resource cards
        this.developmentCards = {knight: 0, victoryPoint: 0, roadBuilding: 0, yearOfPlenty: 0, monopoly: 0, unknown: 0} //development cards
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