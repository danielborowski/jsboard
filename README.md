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

# API

You have access to the following objects using jsboard.

```javascript
jsboard.board({ attach: tableID, size: NxM [,style: "checkerboard"] });
jsboard.piece({ text: pieceName [,cssProperties] });
```

Here is an example board and piece created with the following properties.

```javascript
var b = jsboard.board({ attach: "game", size: "3x3" });
var p = jsboard.piece({ text:"X", fontSize: "45px", textAlign: "center" });
```

If you open your `index.html` you should see the following:

![alt text][logo]
[logo]: http://i.imgur.com/ioWoK5O.png "pic1"
