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
var p = jsboard.piece({ text: "B", fontSize: "40px", textAlign: "center" });
```
If you open `index.html` you should see the following:

![alt text][logo]
[logo]: http://i.imgur.com/ioWoK5O.png "pic1"

Let's add some functionality to our board. We'll make it so that when we click on an empty space, one of our pieces will be placed down. We'll do this using the `cell` function from `jsboard` which can modify and get properties from spaces within the game board.

```javascript
b.cell("each").on("click", function() {
  if (b.cell(this).get()==null) {
    b.cell(this).place(p.clone());
  }
});
```

You should now be able to place X's on your board wherever there's an empty space.
<table id='game'></table>
<script src="http://danielborowski.com/jsboard.min.js"></script>
<script>
// create board
var b = jsboard.board({attach:"game", size:"3x3"});
var p = jsboard.piece({text:"X", fontSize:"40px", textAlign:"center"});
b.cell("each").on("click", function() {
  if (b.cell(this).get()==null) {
    b.cell(this).place(p.clone());
  }
});
</script>

