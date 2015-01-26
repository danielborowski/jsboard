// create board
var b = jsboard.board({attach:"game", size:"30x65"});
b.style({borderSpacing: "1px", margin: "0 auto", marginTop: "6px",});
b.cell("each").style({width:"17px", height:"17px"});

// setup pieces
var lifecell = jsboard.piece({text:"B", fontSize: "14px", textIndent:"-9999px", background: "black"});

// keep track of cells on board
var placedLifeCells = [];
var stopped = false;

// place life cells on board for seed setup
b.cell("each").on("click", function() {
	if (b.cell(this).get()==null) 
		placedLifeCells.push(b.cell(this).where());
	b.cell(this).place(lifecell.clone());
	b.cell(this).on("click", remove);
});

// remove life cell if clicked again
function remove() {
	for (var i=0; i<placedLifeCells.length; i++) 
		if (placedLifeCells[i].toString()==b.cell(this).where().toString()) 
			placedLifeCells.splice(i,1);
	b.cell(this).rid();
	b.cell(this).removeOn("click", remove);
}

// start & stop simulation
document.getElementById("start").addEventListener("click", function() { stopped = false; startSim(); });
document.getElementById("stop").addEventListener("click", function() { stopSim(); });

// run simulation based on game of life rules 
// step 1: populate life cell neighbours 
// step 2: count live neighbours
// setp 3: make decision for current life cell
// step 4: check if dead cell can be brought to life by checking neighbours of neighbours
function startSim() {
	var neighbours = 0;
	var neighbourCheck;
	var nextGenCells = [];
	// check every cell on board
	for (var i=0; i<placedLifeCells.length; i++) {
		// step 1
		neighbours = 0; neighbourCheck = [];
		neighbourCheck.push(
			[placedLifeCells[i][0],placedLifeCells[i][1]-1],
			[placedLifeCells[i][0]-1,placedLifeCells[i][1]-1],
			[placedLifeCells[i][0]-1,placedLifeCells[i][1]],
			[placedLifeCells[i][0]-1,placedLifeCells[i][1]+1],
			[placedLifeCells[i][0],placedLifeCells[i][1]+1],
			[placedLifeCells[i][0]+1,placedLifeCells[i][1]+1],
			[placedLifeCells[i][0]+1,placedLifeCells[i][1]],
			[placedLifeCells[i][0]+1,placedLifeCells[i][1]-1]
		);
		// step 2
		for (var k=0; k<neighbourCheck.length; k++) 
			if (b.cell(neighbourCheck[k]).get()!=null) 
				neighbours++;	
		// step 3
		if (neighbours==2||neighbours==3) 
			nextGenCells.push(placedLifeCells[i]);
		// step 4
		var deadCellNeighbours = 0;
		var deadCellNeighbourCheck;
		for (var n=0; n<neighbourCheck.length; n++) {
			deadCellNeighbours = 0; deadCellNeighbourCheck = [];
			deadCellNeighbourCheck.push(
				[neighbourCheck[n][0],neighbourCheck[n][1]-1],
				[neighbourCheck[n][0]-1,neighbourCheck[n][1]-1],
				[neighbourCheck[n][0]-1,neighbourCheck[n][1]],
				[neighbourCheck[n][0]-1,neighbourCheck[n][1]+1],
				[neighbourCheck[n][0],neighbourCheck[n][1]+1],
				[neighbourCheck[n][0]+1,neighbourCheck[n][1]+1],
				[neighbourCheck[n][0]+1,neighbourCheck[n][1]],
				[neighbourCheck[n][0]+1,neighbourCheck[n][1]-1]
			);
			// count live neighbours
			for (var k=0; k<deadCellNeighbourCheck.length; k++)  
				if (b.cell(deadCellNeighbourCheck[k]).get()!=null) 
					deadCellNeighbours++;
			// make sure dead cell isn't already set to turn live
			// w.o this our array grows like crazy because of duplications
			var exists = false;
			for (var g=0; g<nextGenCells.length; g++) 
				if (nextGenCells[g].toString()==neighbourCheck[n].toString()) 
					exists = true;
			// if 3 then dead cell becomes live (through reproduction lol)
			if (deadCellNeighbours==3 && b.cell(neighbourCheck[n]).get()==null && !exists) 
				nextGenCells.push(neighbourCheck[n]);
		}
	}
	// remove whole past generation from board
	for (var i=0; i<placedLifeCells.length; i++) {
		b.cell(placedLifeCells[i]).rid();
		b.cell(placedLifeCells[i]).removeOn("click", remove);
	}
	// create new generation on board
	placedLifeCells = nextGenCells;
	for (var i=0; i<placedLifeCells.length; i++) {
		b.cell(placedLifeCells[i]).place(lifecell.clone());
		b.cell(placedLifeCells[i]).on("click", remove);
	}
	// run simulation again if new gen exists
	if (placedLifeCells.length>1 && !stopped) 
		setTimeout(function() { startSim(); }, 150);
}

// stop simulation
function stopSim() { stopped = true; }
