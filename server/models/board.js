const {Tile, Corner, Edge} = require("./tile.js");

class Board{
    constructor(){
        this.tiles = []; //2d array containing all tiles on gameboard
        this.corners = []; //array containing references to all corners
        this.edges = []; //array containing references to all edges

        this.generateBoard();
    }

    // SETTERS

    setRoad(userID, i, j, edge){
        var tile = this.getTile(i, j);
        if(tile){
            if(0 <= edge && edge < 6){
                tile.edges[edge] = userID;
                return true;
            }
        }
        return false;
    }

    setSettlement(i, j, corner){

    }

    setCity(i, j, corner){

    }

    // BOARD GENERATION

    generateTiles(){
        //returns a shuffled list of all 19 tiles
        var tiles = [];
        var lst = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
        lst = shuffle(lst);

        for(var i = 0; i < 4; i++){
            tiles.push(new Tile("Grain", lst.pop()));
            tiles.push(new Tile("Lumber", lst.pop()));
            tiles.push(new Tile("Wool", lst.pop()));
        }
        for(var i = 0; i < 3; i++){
            tiles.push(new Tile("Ore", lst.pop()));
            tiles.push(new Tile("Brick", lst.pop()));
        }

        tiles.push(new Tile("Desert"));
        return shuffle(tiles);        
    }

    generateBoard(){
        //creates a valid randomized game board
        var tiles = this.generateTiles();

        var template = [
            [1, 1, 1, 0, 0],
            [1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1],
            [0, 0, 1, 1, 1],
        ]

        for(var i = 0; i < 5; i++){
            var row = [];
            for(var j = 0; j < 5; j++){
                if(template[i][j]){
                    row.push(tiles.pop());
                }
                else{
                    row.push(null);
                }
            }
            this.tiles.push(row);
        }

        for(var i = 0; i < 5; i++){
            for(var j = 0; j < 5; j++){
                if(template[i][j])
                    this.setCorners(i, j);
                    this.setEdges(i, j);
            }
        }
    }

    setCorners(i, j){
        //sets the corners of the tile at i, j if there is one

        var tile = this.getTile(i, j);
        if(!tile)
            return;

        var preset = [
            [-1, -1, 2, -1, 0, 4],
            [-1, 0, 4, 0, 1, 5],
            [0, 1, 4, 1, 1, 0],
            [1, 1, 5, 1, 0, 1],
            [1, 0, 0, 0, -1, 2],
            [0, -1, 1, -1, -1, 3],
        ];

        for(var x = 0; x < 6; x++){
            var set = preset[x];

            var temp1 = this.getTile(i + set[0], j + set[1]);
            if(temp1){
                if(temp1.corners[x]){
                    tile.corners[x] = temp1.corners[set[2]];
                    continue;
                }
            }

            var temp2 = this.getTile(i + set[3], j + set[4]);
            if(temp2){
                if(temp2.corners[x]){
                    tile.corners[x] = temp2.corners[set[5]];
                    continue;
                }
            }

            var newCorner = new Corner(i.toString() + j.toString());
            this.corners.push(newCorner);
            tile.corners[x] = this.corners[this.corners.length - 1];
        }
    }

    setEdges(i, j){
        //sets the edges of the tile at i, j if there is one

        var tile = this.getTile(i, j);
        if(!tile)
            return;

        var preset = [
            [-1, 0, 3],
            [0, 1, 4],
            [1, 1, 5],
            [1, 0, 0],
            [0, -1, 1],
            [-1, -1, 2],
        ];

        for(var x = 0; x < 6; x++){
            var set = preset[x];

            var temp = this.getTile(i + set[0], j + set[1]);
            if(temp){
                if(temp.edges[x]){
                    tile.edges[x] = temp.edges[set[2]];
                    continue;
                }
            }

            var newEdge = new Edge(i.toString() + j.toString());
            this.edges.push(newEdge);
            tile.edges[x] = this.edges[this.edges.length - 1];
        }
    }

    // HELPERS

    getTile(i, j){
        //returns tile if this.board[i][j] is a valid tile, or false otherwise

        if(i < 0 || i >= 5)
            return false;
        if(j < 0 || j >= 5)
            return false;
        if(this.tiles[i][j] == null)
            return false;
        return this.tiles[i][j];
    }
}

function shuffle(a) {
    //mutates and returns a shuffling of list a

    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

module.exports = {Board};