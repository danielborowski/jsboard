// create board
var b = jsboard.board({attach:"game", size:"6x7"});
b.style({borderSpacing: "1px"});
b.cell("each").style({width:"70px", height:"70px", border: "1px solid yellow"});

// setup pieces
var red   = jsboard.piece({text:"R", textIndent:"-9999px", background:"url('images/red.png') no-repeat",   width:"50px", height:"50px", margin:"0 auto" });
var black = jsboard.piece({text:"B", textIndent:"-9999px", background:"url('images/black.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });

// click event for top of each column
var turn = true;
for (var c=0; c<b.cols(); c++) {
	b.cell([0,c]).on("click", function() {
		if (turn) 	dropPiece(b.cell(this).where(), red.clone());
		else 		dropPiece(b.cell(this).where(), black.clone());
		turn = !turn;
	});
}

// determine where in column to drop piece
function dropPiece(where, piece) {
	var colClicked = where[1];
	var colBottom = b.rows()-1;
	var check = b.cell([colBottom,colClicked]).get();
	while ((check!=null)&&(colBottom!=-1)) {
		colBottom -= 1;
		check = b.cell([colBottom,colClicked]).get();
	}
	if (check==null) 
		b.cell([colBottom,colClicked]).place(piece);
}