// create board
var b = jsboard.board({attach:"game", size:"8x8", style:"checkerboard"});
b.cell("each").style({width:"60px", height:"60px"});

// setup pieces
var knight = jsboard.piece({text:"WK", textIndent:"-9999px", background:"url('images/chess/knight.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });
var bishop = jsboard.piece({text:"WB", textIndent:"-9999px", background:"url('images/chess/bishop.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });
var rook   = jsboard.piece({text:"WR", textIndent:"-9999px", background:"url('images/chess/rook.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });
var queen  = jsboard.piece({text:"WQ", textIndent:"-9999px", background:"url('images/chess/queen.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });
var king   = jsboard.piece({text:"WG", textIndent:"-9999px", background:"url('images/chess/king.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });
var pawn   = jsboard.piece({text:"WP", textIndent:"-9999px", background:"url('images/chess/pawn.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });

// create pieces to place in DOM
var whitePieces = [
    knight.clone(),
    knight.clone(),
    bishop.clone(),
    bishop.clone(),
    rook.clone(),
    rook.clone(),
    queen.clone(),
    king.clone()
];
for (var i=0; i<8; i++) 
    whitePieces.push(pawn.clone());

// place pieces on board
b.cell([7,1]).place(whitePieces[0]); b.cell([7,6]).place(whitePieces[1]);
b.cell([7,2]).place(whitePieces[2]); b.cell([7,5]).place(whitePieces[3]);
b.cell([7,0]).place(whitePieces[4]); b.cell([7,7]).place(whitePieces[5]);
b.cell([7,3]).place(whitePieces[6]);
b.cell([7,4]).place(whitePieces[7]);
for (var i=8; i<whitePieces.length; i++) 
    b.cell([6,i-8]).place(whitePieces[i]);

// variables for piece to move and its locs
var bindMoveLocs, bindMovePiece;

// give functionality to pieces
for (var i=0; i<whitePieces.length; i++) 
    whitePieces[i].addEventListener("click", function() { showMoves(this); });

// show new locations 
function showMoves(piece) {

    resetBoard();
        
    // parentNode is needed because the piece you are clicking 
    // on doesn't have access to cell functions, therefore you 
    // need to access the parent of the piece because pieces are 
    // always contained within in cells

    // piece clicked on will be either: WK, WB, WR, WQ, WG, WP
    var thisPiece = b.cell(piece.parentNode).get();
    var newLocs = [];
    var loc;
    loc = b.cell(piece.parentNode).where();

    // movement for knights
    if (thisPiece=="WK") {
        newLocs.push(
            [loc[0]-1,loc[1]-2], [loc[0]-1,loc[1]+2],
            [loc[0]-2,loc[1]-1], [loc[0]-2,loc[1]+1],
            [loc[0]+1,loc[1]-2], [loc[0]+1,loc[1]+2],
            [loc[0]+2,loc[1]-1], [loc[0]+2,loc[1]+1]
        );
    }

    // movement for pawns
    if (thisPiece=="WP") {
        newLocs.push([loc[0]-1,loc[1]]);
        if (loc[0]==6) newLocs.push([loc[0]-2,loc[1]]);     
    }

    // movement for bishops
    // queen also moves like a bishop
    if (thisPiece=="WB"||thisPiece=="WQ") {
        var check = 7;
        // up left diagonal
        var ULD = [loc[0]-1,loc[1]-1];
        while (check>0) {
            if (b.cell(ULD).get()==null) { newLocs.push(ULD); ULD = [ULD[0]-1,ULD[1]-1]; } 
            check--;  
        }
        check = 7;
        // up right diagonal
        var URD = [loc[0]-1,loc[1]+1];
        while (check>0) {
            if (b.cell(URD).get()==null) { newLocs.push(URD); URD = [URD[0]-1,URD[1]+1]; } 
            check--;  
        }
        check = 7;
        // down left diagonal
        var DLD = [loc[0]+1,loc[1]-1];
        while (check>0) {
            if (b.cell(DLD).get()==null) { newLocs.push(DLD); DLD = [DLD[0]+1,DLD[1]-1]; } 
            check--;  
        }
        check = 7;
        // down right diagonal
        var DRD = [loc[0]+1,loc[1]+1];
        while (check>0) {
            if (b.cell(DRD).get()==null) { newLocs.push(DRD); DRD = [DRD[0]+1,DRD[1]+1]; } 
            check--;  
        }
    }

    // movement for rooks
    // queen also moves like a rook
    if (thisPiece=="WR"||thisPiece=="WQ") {
        var check = 7;
        var U = [loc[0]-1,loc[1]];
        while (check>0) {
            if (b.cell(U).get()==null) { newLocs.push(U); U = [U[0]-1,U[1]]; } 
            check--;  
        }
        check = 7;
        // up right diagonal
        var L = [loc[0],loc[1]-1];
        while (check>0) {
            if (b.cell(L).get()==null) { newLocs.push(L); L = [L[0],L[1]-1]; } 
            check--;  
        }
        check = 7;
        // down left diagonal
        var R = [loc[0],loc[1]+1];
        while (check>0) {
            if (b.cell(R).get()==null) { newLocs.push(R); R = [R[0],R[1]+1]; } 
            check--;  
        }
        check = 7;
        // down right diagonal
        var D = [loc[0]+1,loc[1]];
        while (check>0) {
            if (b.cell(D).get()==null) { newLocs.push(D); D = [D[0]+1,D[1]]; } 
            check--;  
        }
    }

    // movement for king
    if (thisPiece=="WG") {
        newLocs.push(
            [loc[0]-1,loc[1]],   [loc[0]+1,loc[1]],
            [loc[0],loc[1]-1],   [loc[0],loc[1]+1],
            [loc[0]-1,loc[1]-1], [loc[0]-1,loc[1]+1],
            [loc[0]+1,loc[1]-1], [loc[0]+1,loc[1]+1]
        );
    }

    // remove illegal moves by checking 
    // content of b.cell().get()
    (function removeIllegalMoves(arr) {
        var fixedLocs = [];
        for (var i=0; i<arr.length; i++) 
            if (b.cell(arr[i]).get()==null)
                fixedLocs.push(arr[i]); 
        newLocs = fixedLocs;
    })(newLocs); 

    // bind green spaces to movement of piece
    bindMoveLocs = newLocs.slice();
    bindMovePiece = piece; 
    bindMoveEvents(bindMoveLocs);

}

// bind move event to new piece locations
function bindMoveEvents(locs) {
    for (var i=0; i<locs.length; i++) {
        b.cell(locs[i]).DOM().classList.add("green");
        b.cell(locs[i]).on("click", movePiece);  
    }
}

// actually move the piece
function movePiece() {
    var userClick = b.cell(this).where();
    if (bindMoveLocs.indexOf(userClick)) {
        b.cell(userClick).place(bindMovePiece);
        resetBoard();
    }
}

// remove previous green spaces and event listeners
function resetBoard() {
    for (var r=0; r<b.rows(); r++) {
        for (var c=0; c<b.cols(); c++) {
            b.cell([r,c]).DOM().classList.remove("green");
            b.cell([r,c]).removeOn("click", movePiece);
        }
    }
}