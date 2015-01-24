// create board
var b = jsboard.board({attach:"game", size:"8x8", style:"checkerboard", stylePattern: ["#1f6988","lightblue"]});
b.cell("each").style({width:"65px", height:"65px"});

// setup pieces
var red   = jsboard.piece({text:"R", textIndent:"-9999px", background:"url('images/red.png') no-repeat",   width:"50px", height:"50px", margin:"0 auto" });
var black = jsboard.piece({text:"B", textIndent:"-9999px", background:"url('images/black.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });

// create pieces to place in DOM
var p1 = red.clone();
var p2 = black.clone();

// place pieces on board
b.cell([6,5]).place(p1);
b.cell([4,5]).place(p2);

// give functionality to red piece
p1.addEventListener("click", function() { showMoves(this); });

// show new locations 
function showMoves(piece) {

    // parentNode is needed because the piece you are clicking 
    // on doesn't have access to cell functions, therefore you 
    // need to access the parent of the piece because pieces are 
    // always contained within in cells
    var loc = b.cell(piece.parentNode).where();
    var newLocs = [[loc[0]-1,loc[1]-1],[loc[0]-1,loc[1]+1]];

    // locations to move to and simple jump check
    for (var i=0; i<newLocs.length; i++) {
        if (b.cell(newLocs[i]).get()=="B") { 
            if (!i) newLocs[i] = [loc[0]-2,loc[1]-2];
            else newLocs[i] = [loc[0]-2,loc[1]+2];
        }
        b.cell(newLocs[i]).style({background:"yellow"});
        b.cell(newLocs[i]).on("click", movePiece);
    }

    // move piece to new location when clicked
    function movePiece() {
        b.cell(this).place(piece);
        b.removeEvents("click", movePiece);
        for (var i=0; i<newLocs.length; i++) 
            b.cell(newLocs[i]).style({background:"lightblue"});
    }

}