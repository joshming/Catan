var c = document.getElementById('Board');
var cxt = c.getContext("2d");
c.width = document.body.clientWidth;
c.height = window.innerHeight;


class Hex{
    constructor(i, j){
        this.xcenter = i;
        this.ycenter = j;
    }

    drawHex(x, y){ 
        var numberOfSides = 6,
        size = 85;
        Xcenter = x; 
        Ycenter = y;

        cxt.beginPath();
        cxt.moveTo (Xcenter +  size * Math.sin(0), Ycenter +  size *  Math.cos(0));          
        
        for (var i = 1; i <= numberOfSides;i += 1) {
            cxt.lineTo (Xcenter + size * Math.sin(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.cos(i * 2 * Math.PI / numberOfSides));
        }
        
        cxt.strokeStyle = "#eee";
        cxt.lineWidth = 5;
        cxt.fill();
        cxt.stroke();
    }

}

function drawBoard(lst){
    var xshift = 85 * Math.sqrt(3);
    var yshift = 1.5 * 85;

    for(var i = 0; i < lst.length; i++){
        for(var j = 0; j < lst[i].length; i++){
            var hexagon = lst[i][j]
            if(hexagon != null){
                hexagon.drawHex(hexagon.this.xcenter - j * xshift, hexagon.this.ycenter + i * yshift);
            } 
        }
    }
}