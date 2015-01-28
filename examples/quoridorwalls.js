// create board
var b = jsboard.board({attach:"game", size:"2x15"});
b.cell("each").style({width:"65px", height:"65px"});

// setup pieces
var player = jsboard.piece({text:"P", textIndent:"-9999px", background:"url('images/black.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });
var piece_wall = jsboard.piece({text:"wall", fontSize:"0px"});

// create piece to place in DOM
var p1 = player.clone();
b.cell([0,0]).place(p1);

// give functionality to your piece
p1.addEventListener("click", function() { 
    var w = b.cell(this.parentNode,1).get();
    // if next space is not a wall then you can move past it
    if (w!="wall") { 
        // allow board overlapping but modify movement
        var nextSpace = b.cell(this.parentNode,2).where();
        var curRow = b.cell(this.parentNode).where();
        if (nextSpace[0]!=curRow[0]) b.cell(this.parentNode,1).place(p1);
        else b.cell(this.parentNode,2).place(p1);
    }
 });

// add functionality for placing red walls
for (var r=0; r<b.rows(); r++) {
    for (var c=0; c<b.cols(); c++) {
        if (c%2) { 
            b.cell([r,c]).style({background:"darkgray", width: "5px"});
            b.cell([r,c]).on("click", function() {
                b.cell(this).style({background:"red"});
                b.cell(this).place(piece_wall.clone());
            });
        }
    }
}