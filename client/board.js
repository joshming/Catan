var c;
var cxt;

function onLoad(){
    c = document.getElementById('Board');
    cxt = c.getContext("2d");
    c.width = document.body.clientWidth;
    c.height = window.innerHeight;
    drawBoard(lst);
}

class Hex{
    constructor(i, j, colour){
        this.xcenter = i;
        this.ycenter = j;
        this.colour = colour;
        this.number = null;
    }

    drawHex(x, y){ 
        var numberOfSides = 6;
        var size = c.height / 12;
        var Xcenter = x + c.height / 4 * Math.sqrt(3); 
        var Ycenter = y + c.height / 6;

        cxt.beginPath();
        cxt.moveTo (Xcenter +  size * Math.sin(0), Ycenter +  size *  Math.cos(0));          
        
        for (var i = 1; i <= numberOfSides;i += 1) {
            cxt.lineTo (Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
        }
        cxt.closePath();
        cxt.fillStyle = this.colour;
        cxt.fill();
        cxt.strokeStyle = "#000";
        cxt.lineWidth = 5;
        cxt.stroke();
    }

    drawSmallerHex(x, y){
        var numberOfSides = 6;
        var size = c.height / 30;
        var Xcenter = x + c.height / 4 * Math.sqrt(3); 
        var Ycenter = y + c.height / 6;

        cxt.beginPath();
        cxt.moveTo (Xcenter +  size * Math.sin(0), Ycenter +  size *  Math.cos(0));          
        
        for (var i = 1; i <= numberOfSides;i += 1) {
            cxt.lineTo (Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
        }
        cxt.closePath();
        cxt.fillStyle = this.colour;
        cxt.fill();
        cxt.strokeStyle = "#BFBFBF";
        cxt.lineWidth = 3;
        cxt.stroke();
    }

}

function drawBoard(lst){
    var xshift = (c.height / 12) * Math.sqrt(3) + 15;
    var yshift = 1.5 * (c.height / 12) + 15;

    for(var i = 0; i < lst.length; i++){
        for(var j = 0; j < lst[i].length; j++){
            var hexagon = lst[i][j]
            if (hexagon != null){
                if(i == 0){
                    hexagon.drawHex(hexagon.xcenter + j * xshift, hexagon.ycenter);
                    hexagon.drawSmallerHex(hexagon.xcenter + (j - .5* i) * xshift, hexagon.ycenter + i * yshift);
                } 
                else if(i == 2 && j == 2){
                    hexagon.drawHex(hexagon.xcenter + (j - .5* i) * xshift, hexagon.ycenter + i * yshift);
                }
                else {
                    hexagon.drawHex(hexagon.xcenter + (j - .5* i) * xshift, hexagon.ycenter + i * yshift);
                    hexagon.drawSmallerHex(hexagon.xcenter + (j - .5* i) * xshift, hexagon.ycenter + i * yshift);
                }
            }
        }
    }
}

// to test board function
var hex = new Hex(0, 0, '#000')
var hex2 = new Hex(1, 0, '#fff')
var hex3 = new Hex(2, 0, '#eee')
var hex4 = new Hex(0, 1, '#eee')
var hex5 = new Hex(1, 1, '#000')
var hex6 = new Hex(2, 1, '#eee')
var hex7 = new Hex(3, 1, '#eee')
var hex8 = new Hex(0, 2, '#eee')
var hex9 = new Hex(1, 2, '#eee')
var hex10 = new Hex(2, 2, '#eee')
var hex11 = new Hex(3, 2, '#eee')
var hex12 = new Hex(4, 2, '#eee')
var hex13 = new Hex(0, 3, '#eee')
var hex14 = new Hex(1, 3, '#eee')
var hex15 = new Hex(2, 3, '#eee')
var hex16 = new Hex(3, 3, '#eee')
var hex17 = new Hex(0, 4, '#eee')
var hex18 = new Hex(1, 4, '#eee')
var hex19 = new Hex(2, 4, '#eee')
var lst = [[hex, hex2, hex3, null, null], 
           [hex4, hex5, hex6, hex7, null],
           [hex8, hex9, hex10, hex11, hex12],
           [null, hex13, hex14, hex15, hex16],
           [null, null, hex17, hex18, hex19]]


function turns() { 
    var b = document.getElementById('turn')
    var text = document.getElementById('player-turn')
    console.log(b)
    if(b.innerHTML == 'Start Turn'){
        b.innerHTML = 'End Turn';
        text.classList.add('show');
        b.classList.remove('show')
    }
    else{ 
        b.innerHTML = 'Start Turn';
        text.classList.remove('show')
        b.classList.add('show')
    }
}