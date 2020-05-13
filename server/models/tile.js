class Tile{
    constructor(type, value){
        this.type = type; //string describing the resource type of this tile
        this.value = value; //int describing the die roll value of this tile

        this.corners = [null, null, null, null, null, null];
        this.edges = [null, null, null, null, null, null];
    }

    misc(){
        switch(this.type){
            case "Grain":
                this.type = "Grain";
                break;
            case "Lumber":
                this.type = "Lumber";
                break;
            case "Wool":
                this.type = "Wool";
                break;
            case "Grain":
                this.type = "Grain";
                break;
            case "Brick":
                this.type = "Brick";
                break;
            case "Desert":
                this.type = "Desert";
                break;       
        }
    }
}

class Corner{
    constructor(id){
        //this.owner = null;
        this.id = id
    }    
}

class Edge{
    constructor(id){
        //this.owner = null;
        this.id = id;
    }    
}

module.exports = {Tile, Edge, Corner};