// create board
var b = jsboard.board({attach:"game", size:"8x8", style:"checkerboard"});
b.cell("each").style({width:"65px", height:"65px"});

// setup pieces
var knight = jsboard.piece({text:"WK", textIndent:"-9999px", background:"url('images/white.png') no-repeat",   width:"50px", height:"50px", margin:"0 auto" });
var opp    = jsboard.piece({text:"BK", textIndent:"-9999px", background:"url('images/bknight.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });

// create pieces to place in DOM
var k = knight.clone();
var o = opp.clone();

// place pieces on board
b.cell([5,5]).place(k);
b.cell([2,3]).place(o);

// give functionality to knights
k.addEventListener("click", function() { showMoves(this); });
o.addEventListener("click", function() { showMoves(this); });

// show new locations 
function showMoves(piece) {

    // parentNode is needed because the piece you are clicking 
    // on doesn't have access to cell functions, therefore you 
    // need to access the parent of the piece because pieces are 
    // always contained within in cells
    var loc = b.cell(piece.parentNode).where();
    var newLocs = [
        [loc[0]-1,loc[1]-2], [loc[0]-1,loc[1]+2],
        [loc[0]-2,loc[1]-1], [loc[0]-2,loc[1]+1],
        [loc[0]+1,loc[1]-2], [loc[0]+1,loc[1]+2],
        [loc[0]+2,loc[1]-1], [loc[0]+2,loc[1]+1]
    ];

    // locations to move to 
    // to use JavaScript DOM functions such as classList you need
    // to get the DOM node from the board which you can do by
    // calling cell([x,y]).DOM() or cell(this).DOM()
    for (var i=0; i<newLocs.length; i++) {
        b.cell(newLocs[i]).DOM().classList.add("green");
        b.cell(newLocs[i]).on("click", movePiece);
    }

    // move piece to new location when clicked
    function movePiece() {
        b.cell(this).place(piece);
        b.removeEvents("click", movePiece);
        for (var i=0; i<newLocs.length; i++) 
            b.cell(newLocs[i]).DOM().classList.remove("green");
    }

}