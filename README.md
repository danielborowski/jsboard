# jsboard
JavaScript library that allows you to easily create board games like [Chess](http://danielborowski.com/jsboard/demo/demo8/) and Conway's [Game of Life](http://danielborowski.com/jsboard/demo/demo9/).
<br><br>
`jsboard` allows you to focus on your game logic, game AI, and game algorithms rather than focusing on creating and styling your game using HTML and CSS. `jsboard` allows you to create and play 2D board games very easily using its functions so you don't have to worry about how to represent your game in JavaScript or how to display it in the HTML. 
<br><br>
`jsboard` doesn't require jQuery or any other libraries. Simply include the library in your HTML file like in the example below.

# Contents

* [Setting Up](#setting-up)
* [Introduction](#introduction)
* [Documentation](#documentation)
* [Examples](#examples)

# Setting Up
All you need to get started is a simple HTML file and a JS file where your game code will go. Here's how your `index.html` file should look:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Title</title>
</head>
<body>
  <table id='game'></table>
  <script src="jsboard.min.js"></script>
  <script src="index.js"></script>
</body>
</html>
```
Then create a blank `index.js` file where the game code will go.

# Introduction

You have access to the following objects using jsboard.

```javascript
jsboard.board({ attach: tableID, size: NxM [,style: "checkerboard"] [,stylePattern: [color1, color2]] });
jsboard.piece({ text: pieceName [,cssProperties] });
```

Here is an example board and piece created with the following properties.

```javascript
var b = jsboard.board({ attach: "game", size: "3x3" });
var x = jsboard.piece({ text: "X", fontSize: "40px", textAlign: "center" });
```
If you open `index.html` you should see the following:

![alt text][logo]

[logo]: http://i.imgur.com/ioWoK5O.png "pic"

Let's add some functionality to our board. We'll make it so that when we click on an empty space, one of our pieces will be placed down. We'll do this using the `cell` function from `jsboard` which can modify and get properties from spaces within the game board.

```javascript
b.cell("each").on("click", function() {
  if (b.cell(this).get()===null) {
    b.cell(this).place(x.clone());
  }
});
```
You should now be able to place X's on the board. [Check it out here](http://danielborowski.com/jsboard/demo/demo1/)

Let's actually turn this into a tic-tac-toe game. All we need to do is alternate the placing of pieces X and O. Here's how the final `index.js` should look.

```javascript
var b = jsboard.board({ attach: "game", size: "3x3" });
var x = jsboard.piece({ text: "X", fontSize: "40px", textAlign: "center" });
var o = jsboard.piece({ text: "O", fontSize: "40px", textAlign: "center"});

var turn = true;
b.cell("each").on("click", function() {
  if (b.cell(this).get()===null) {
    if (turn) { b.cell(this).place(x.clone()); }
    else      { b.cell(this).place(o.clone()); }
    turn = !turn;
  }
});
```

That's it! We just created a functioning tic-tac-toe game using these simple commands. [Check out the tic-tac-toe game here](http://danielborowski.com/jsboard/demo/demo2/)

What if we want to change the styling of our board? We actually have `jsboard` functions to modify each cell or modify the whole board. We'll make changes to both.

```javascript
b.style({ borderSpacing: "8px" });
b.cell("each").style({ 
  width: "75px", 
  height: "75px", 
  background: "lightblue", 
  borderRadius: "15px" 
});
```
Here's what you should see now.

![alt text][logo2]

[logo2]: http://i.imgur.com/berlbMg.png "pic"

# Documentation

Create a board.
```javascript
jsboard.board({ attach: tableID, size: NxM [,style: "checkerboard"] [,stylePattern: [color1, color2]] });
// var b = jsboard.board({ attach: "game", size: "3x3" }); 
// var c = jsboard.board({ attach: "game", size: "8x8", style: "checkerboard" }); 
// var d = jsboard.board({ attach: "game", size: "8x8", style: "checkerboard", stylePattern: ["blue","green"] }); 
```

Board properties, methods, and styling.
```javascript
var b = jsboard.board({ attach: "game", size: "5x8", style: "checkerboard" }); 
b.matrix(); // matrix representation containing values from piece.text or null
b.rows();   // 5
b.cols();   // 8
b.removeEvents(event, func); // removes event listeners from all board spaces (see chessknight example)
b.style({ cssProperties });
```

Create pieces.
```javascript
jsboard.piece({ text: pieceName [,cssProperties] });
// var x = jsboard.piece({ text: "X", fontSize: "40px", textAlign: "center" });
// var k = jsboard.piece({ text: "WK", textIndent: "-9999px", background: "url('images/white.png') no-repeat", width: "50px", height: "50px", margin: "0 auto" });
```
Piece methods and styling.
```javascript
var p = jsboard.piece({ text: "X", fontSize: "40px", textAlign: "center" });
p.style({ cssProperties });
var x = p.clone(); // you must clone a piece before placing it on the board because jsboard.piece only serves as a piece schema and clone() gets it ready for the DOM
```

Cell methods.
```javascript
var b = jsboard.board({ attach: "game", size: "5x8", style: "checkerboard" }); 
var p = jsboard.piece({ text: "X", fontSize: "40px", textAlign: "center" });

// styling cells
b.cell("each").style({ cssProperties });
b.cell([N,M]).style({ cssProperties }); // [N,M] = position on the game board using matrix notation
b.cell(this).style({ cssProperties }); // this = current cell 
b.cell(this,K).style({ cssProperties }); // (this,K) = some position K spaces from this cell. Example: b.cell(this,3) represents the cell 3 spaces to the right of this cell (see quoridorwalls example)

// placing pieces in cells
b.cell("each").place(p.clone());
b.cell([N,M]).place(p.clone());
b.cell(this).place(p.clone());
b.cell(this,K).place(p.clone());

// removing pieces from cells
b.cell("each").rid();
b.cell([N,M]).rid();
b.cell(this).rid();
b.cell(this,K).rid();

// adding event listeners to cells
b.cell("each").on(event, function); 
b.cell([N,M]).on(event, function); // Example: b.cell([0,0]).on("click", function() { alert("clicked!"); } );
b.cell(this).on(event, function);
b.cell(this,K).on(event, function);

// removing event listeners from cells
b.cell("each").removeOn(event, function); 
b.cell([N,M]).removeOn(event, function); // Example: b.cell([0,0]).removeOn("click", myFunc } ); 
b.cell(this).removeOn(event, function);
b.cell(this,K).removeOn(event, function);

// get content of cell to see if a piece is within some cell 
// either null or piece.text is returned
b.cell([N,M]).get();
b.cell(this).get();
b.cell(this,K).get();

// check where a specific cell is within the game board 
// returns matrix notation [N,M] of cell within game board
b.cell(this).where();
b.cell(this,K).where();

// return the DOM node for given cell in order to manipulate using
// standard JS functions. Example: b.cell([0,0]).DOM().classList.add("myclass"); 
b.cell([N,M]).DOM();
b.cell(this).DOM();
b.cell(this,K).DOM();
```
# Examples

Basic
* [Tic-tac-toe game](http://danielborowski.com/jsboard/demo/demo3/) simple tic-tac-toe game
* [Connect Four](http://danielborowski.com/jsboard/demo/demo7/) click the top of each column to drop a piece

Checkerboard style
* [Checkers pieces](http://danielborowski.com/jsboard/demo/demo4/) click the red piece to move around
* [Chessboard knights](http://danielborowski.com/jsboard/demo/demo5/) click the knights to move around
* [One-sided Chess game](http://danielborowski.com/jsboard/demo/demo8/) complete movements for white chess pieces

Other games and simulations
* [Conway's Game of Life](http://danielborowski.com/jsboard/demo/demo9/) place some life cells down and watch your simulation create and destroy life (here's a list of [interesting patterns](http://www.conwaylife.com/wiki/Category:Patterns) you can try out)
* [Quoridor(ish) wall placement](http://danielborowski.com/jsboard/demo/demo6/) click the piece to move it to the right and click between the spaces to create a wall that prevents the piece from moving past it
