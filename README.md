# jsboard
JavaScript library for board games.
<br><br>
jsboard allows you to focus on your game logic, game AI, and game algorithms rather than focusing on creating and styling your game using HTML and CSS. jsboard allows you to create and play 2D board games very easily using its functions so you don't have to worry about how to represent your game in JavaScript or how to display it in the HTML. 

# Setting Up
All you need to get started is a simple HTML file and a JS file where your game code will go. Here's how your `index.html` file should look:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
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
jsboard.board({ attach: tableID, size: NxM [,style: "checkerboard"] });
jsboard.piece({ text: pieceName [,cssProperties] });
```

Here is an example board and piece created with the following properties.

```javascript
var b = jsboard.board({ attach: "game", size: "3x3" });
var x = jsboard.piece({ text: "X", fontSize: "40px", textAlign: "center" });
```
If you open `index.html` you should see the following:

![alt text][logo]
[logo]: http://i.imgur.com/ioWoK5O.png "pic1"

Let's add some functionality to our board. We'll make it so that when we click on an empty space, one of our pieces will be placed down. We'll do this using the `cell` function from `jsboard` which can modify and get properties from spaces within the game board.

```javascript
b.cell("each").on("click", function() {
  if (b.cell(this).get()==null) {
    b.cell(this).place(x.clone());
  }
});
```
You should now be able to place X's on the board. [Check it out here](http://danielborowski.com/jsboard/demo/demo1.html)

Let's actually turn this into a tic-tac-toe game. All we need to do is alternate the placing of pieces X and O. Here's how the final `index.js` should look.

```javascript
var b = jsboard.board({ attach: "game", size: "3x3" });
var x = jsboard.piece({ text: "X", fontSize: "40px", textAlign: "center" });
var o = jsboard.piece({ text: "O", fontSize: "40px", textAlign: "center"});

var turn = true;
b.cell("each").on("click", function() {
  if (b.cell(this).get()==null) {
    if (turn)   b.cell(this).place(x.clone());
    else        b.cell(this).place(o.clone()); 
    turn = !turn;
  }
});
```

That's it! We just created a functioning tic-tac-toe game (but without alterting a winner) using these simple commands. [Check out the tic-tac-toe game here](http://danielborowski.com/jsboard/demo/demo2.html)
