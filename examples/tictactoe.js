// create board
var b = jsboard.board({attach:"game", size:"3x3"});
b.cell("each").style({width:"75px", height:"75px"});

// setup pieces
var piece_x = jsboard.piece({text:"X", fontSize:"45px", textAlign:"center"});
var piece_o = jsboard.piece({text:"O", fontSize:"45px", textAlign:"center"});

// alternate turns of x and o
var turn = true;
b.cell("each").on("click", function() {
    if (b.cell(this).get()==null) {
        if (turn)   b.cell(this).place(piece_x.clone());
        else        b.cell(this).place(piece_o.clone()); 
        turn = !turn;
    }
});