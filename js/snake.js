//Nongameplay Javascript 
window.addEventListener("keydown", function (e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);
var sliderSpeed = document.getElementById("speedRange");
var outputSpeed = document.getElementById("speedValue");
var sliderTargets = document.getElementById("targetsRange");
var outputTargets = document.getElementById("targetsValue");
var sliderAdded = document.getElementById("addedRange");
var outputAdded = document.getElementById("addedValue");
var sliderRows = document.getElementById("rowsRange");
var outputRows = document.getElementById("rowsValue");
outputSpeed.innerHTML = "Speed: " + sliderSpeed.value;
outputTargets.innerHTML = "Targets: " + sliderTargets.value;
outputAdded.innerHTML = "Squares Gained: " + sliderAdded.value;
outputRows.innerHTML = "Rows: " + sliderRows.value;
sliderSpeed.oninput = function () {
  outputSpeed.innerHTML = "Speed: " + this.value;
}
sliderTargets.oninput = function () {
  outputTargets.innerHTML = "Targets: " + this.value;
}
sliderAdded.oninput = function () {
  outputAdded.innerHTML = "Squares Gained: " + this.value;
}
sliderRows.oninput = function () {
  outputRows.innerHTML = "Rows: " + this.value;
}
var rows = 50;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var nativeWidth = 800;  // the resolution the games is designed to look best in
var nativeHeight = 800;
var deviceWidth = window.innerHeight * .8;  // please check for browser compatibility
var deviceHeight = window.innerHeight * .8;
var blockSize = Math.round(deviceWidth / rows);
deviceWidth = blockSize * rows;
deviceHeight = blockSize * rows;
var scaleFillNative = Math.max(deviceWidth / nativeWidth, deviceHeight / nativeHeight);
var scaleFitNative = Math.min(deviceWidth / nativeWidth, deviceHeight / nativeHeight);
canvas.style.width = deviceWidth + "px";
canvas.style.height = deviceHeight + "px";
canvas.width = deviceWidth;
canvas.height = deviceHeight;
ctx.imageSmoothingEnabled = false; // turn it off for high res screens.
document.addEventListener("keydown", inputMangement, false);

function scale() {
  deviceWidth = window.innerHeight * .8;
  deviceHeight = window.innerHeight * .8;
  blockSize = Math.round(deviceWidth / rows);
  deviceWidth = blockSize * rows;
  deviceHeight = blockSize * rows;
  canvas.style.width = deviceWidth + "px";
  canvas.style.height = deviceHeight + "px";
  canvas.width = deviceWidth;
  canvas.height = deviceHeight;
  startLocationOfSnakes[1] = { xloc: (blockSize * 4), yloc: (blockSize * 4) };
  startLocationOfSnakes[0] = { xloc: (blockSize * (rows - 4)), yloc: (blockSize * 4) };
}
//Gamplay Variables
var twoPlayerSnake = true;
var numberOfSnakes = 1;
var numOfTargets = 1;
var speed = 50;
var numberOfSquaresAdded = 1;
var numberOfSnakes = 1;
var colorSnake1 = "#C60A18";
var colorSnake2 = "#00FFA1";
var arrayOfSnakes = new Array();
var startLocationOfSnakes = new Array();
var targets = new Array();
targets[0] = new target();
// var gameover = document.getElementById('gameover');
var time;
var keypress = [false, false];
var missedKey = [0, 0];
resetGame();

//<Gameplay Functions>
function inputMangement(e) {
  if (keypress[0]) {
    missedKey[0] = e;
  } else {
    //Right Arrow
    if (e.keyCode == 39) {
      movementMangement(blockSize, 0, 0);
      keypress[0] = true;
    }
    //Left Arrow
    if (e.keyCode == 37) {
      movementMangement(-blockSize, 0, 0);
      keypress[0] = true;
    }
    //Up Arrow
    if (e.keyCode == 38) {
      movementMangement(0, -blockSize, 0);
      keypress[0] = true;
    }
    //Down Arrow 
    if (e.keyCode == 40) {
      movementMangement(0, blockSize, 0);
      keypress[0] = true;
    }
    if (twoPlayerSnake) {
      if (keypress[1]) {
        missedKey[1] = e;
      } else {
        //D
        if (e.keyCode == 68) {
          movementMangement(blockSize, 0, 1);
          keypress[1] = true;
        }
        //A
        if (e.keyCode == 65) {
          movementMangement(-blockSize, 0, 1);
          keypress[1] = true;
        }
        //W
        if (e.keyCode == 87) {
          movementMangement(0, -blockSize, 1);
          keypress[1] = true;
        }
        //S
        if (e.keyCode == 83) {
          movementMangement(0, blockSize, 1);
          keypress[1] = true;
        }
      }
    }
  }
  //R restart
  if (e.keyCode == 82) {
    resetGame();
  }
  //Enter FullScreen
  if (e.keyCode === 13) {
    toggleFullScreen();
  }
}   // End of inputMangement

function toggleFullScreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) { /* Firefox */
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { /* IE/Edge */
    canvas.msRequestFullscreen();
  }
}   //End of toggleFullScreen

function play() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snakeIndexLoop: for (var snakeIndex = 0; snakeIndex < arrayOfSnakes.length; snakeIndex++) {
    for (var target = 0; target < numOfTargets; target++) {
      if ((Math.abs(arrayOfSnakes[snakeIndex].xloc[0] - targets[target].xloc) < blockSize) && (Math.abs(arrayOfSnakes[snakeIndex].yloc[0] - targets[target].yloc) < blockSize)) {
        spawnNewSquares(snakeIndex);
        spawnTarget(target);
      }
    }
    if (twoPlayerSnake) {
      var otherSnake;
      if (snakeIndex == 0) {
        otherSnake = 1;
      } else {
        otherSnake = 0;
      }
    }
    for (var blockIndex = 0; blockIndex < arrayOfSnakes[snakeIndex].xloc.length; blockIndex++) {
      if (twoPlayerSnake && (Math.abs(arrayOfSnakes[snakeIndex].xloc[0] - arrayOfSnakes[otherSnake].xloc[blockIndex]) == 0) && (Math.abs(arrayOfSnakes[snakeIndex].yloc[0] - arrayOfSnakes[otherSnake].yloc[blockIndex]) == 0)) {
        clearInterval(time);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.drawImage(gameover, deviceWidth / 4, deviceHeight / 4, deviceWidth / 2, deviceHeight / 2);
        break snakeIndexLoop;
      }
      if ((Math.abs(arrayOfSnakes[snakeIndex].xloc[0] - arrayOfSnakes[snakeIndex].xloc[blockIndex]) == 0) && (Math.abs(arrayOfSnakes[snakeIndex].yloc[0] - arrayOfSnakes[snakeIndex].yloc[blockIndex]) == 0) && blockIndex > 0) {
        clearInterval(time);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.drawImage(gameover, deviceWidth/4,  deviceHeight/4, deviceWidth/2,  deviceHeight/2);
        console.log("SNAKE");
        break snakeIndexLoop;
      }
      if ((arrayOfSnakes[snakeIndex].xloc[0] > (deviceWidth - blockSize) + 1 || arrayOfSnakes[snakeIndex].xloc[0] < 0) || (arrayOfSnakes[snakeIndex].yloc[0] > (deviceHeight - blockSize) + 1 || arrayOfSnakes[snakeIndex].yloc[0] < 0)) {
        clearInterval(time);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.drawImage(gameover, deviceWidth / 4, deviceHeight / 4, deviceWidth / 2, deviceHeight / 2);
        console.log("BORDER");
        break snakeIndexLoop;
      }
      if (blockIndex == 0) {
        arrayOfSnakes[snakeIndex].xPlaceHolder[0] = arrayOfSnakes[snakeIndex].xloc[0];
        arrayOfSnakes[snakeIndex].yPlaceHolder[0] = arrayOfSnakes[snakeIndex].yloc[0]
        arrayOfSnakes[snakeIndex].xloc[0] += arrayOfSnakes[snakeIndex].xDirection;
        arrayOfSnakes[snakeIndex].yloc[0] += arrayOfSnakes[snakeIndex].yDirection;
        keypress[snakeIndex] = false;
      } else {
        arrayOfSnakes[snakeIndex].xPlaceHolder[blockIndex] = arrayOfSnakes[snakeIndex].xloc[blockIndex];
        arrayOfSnakes[snakeIndex].yPlaceHolder[blockIndex] = arrayOfSnakes[snakeIndex].yloc[blockIndex];
        arrayOfSnakes[snakeIndex].xloc[blockIndex] = arrayOfSnakes[snakeIndex].xPlaceHolder[blockIndex - 1];
        arrayOfSnakes[snakeIndex].yloc[blockIndex] = arrayOfSnakes[snakeIndex].yPlaceHolder[blockIndex - 1];
      }
      if (snakeIndex == 0) {
        drawSquare(arrayOfSnakes[snakeIndex].xloc[blockIndex], arrayOfSnakes[snakeIndex].yloc[blockIndex], colorSnake1);
      } else {
        drawSquare(arrayOfSnakes[snakeIndex].xloc[blockIndex], arrayOfSnakes[snakeIndex].yloc[blockIndex], colorSnake2);
      }
      for (var targetIndex = 0; targetIndex < numOfTargets; targetIndex++) {
        drawSquare(targets[targetIndex].xloc, targets[targetIndex].yloc, "#004DFF");
      }
    }
    if (missedKey[snakeIndex] != 0) {
      keypress[snakeIndex] = false;
      inputMangement(missedKey[snakeIndex]);
      missedKey[snakeIndex] = 0;
    }
  }
}   //End of play

function movementMangement(myxDirection, myyDirection, snakeIndex) {
  if (arrayOfSnakes[snakeIndex].xloc[0] % blockSize != 0) {
    arrayOfSnakes[snakeIndex].xloc[0] += (blockSize - (arrayOfSnakes[snakeIndex].xloc[0] % blockSize));
  }
  if (arrayOfSnakes[snakeIndex].yloc[0] % blockSize != 0) {
    arrayOfSnakes[snakeIndex].yloc[0] += (blockSize - (arrayOfSnakes[snakeIndex].yloc[0] % blockSize));
  }
  if (myxDirection != arrayOfSnakes[snakeIndex].xDirection * -1 || arrayOfSnakes[snakeIndex].xloc.length == 1) {
    arrayOfSnakes[snakeIndex].xDirection = myxDirection;
  }
  if (myyDirection != arrayOfSnakes[snakeIndex].yDirection * -1 || arrayOfSnakes[snakeIndex].yloc.length == 1) {
    arrayOfSnakes[snakeIndex].yDirection = myyDirection;
  }
}   //End of movementMangement

function spawnTarget(target) {
  if (target == null) {
    for (var targetIndex = 0; targetIndex < numOfTargets; targetIndex++) {
      do {
        var occupied = false;
        targets[targetIndex].xloc = (Math.random() * deviceWidth);
        targets[targetIndex].yloc = (Math.random() * deviceHeight);
        if ((targets[targetIndex].xloc % blockSize) != 0) {
          targets[targetIndex].xloc = (targets[targetIndex].xloc - (targets[targetIndex].xloc % blockSize));
        }
        if ((targets[targetIndex].yloc % blockSize) != 0) {
          targets[targetIndex].yloc = (targets[targetIndex].yloc - (targets[targetIndex].yloc % blockSize));
        }
        for (var snakeIndex = 0; snakeIndex < arrayOfSnakes.length; snakeIndex++) {
          for (var blockIndex = 0; blockIndex < arrayOfSnakes[snakeIndex].xloc.length; blockIndex++) {
            if ((Math.abs(arrayOfSnakes[snakeIndex].xloc[blockIndex] - targets[targetIndex].xloc) <= blockSize) && (Math.abs(arrayOfSnakes[snakeIndex].yloc[blockIndex] - targets[targetIndex].yloc) <= blockSize)) {
              occupied = true;
              break;
            }
          }
        }
      } while (occupied);
    }
  } else {
    do {
      var occupied = false;
      targets[target].xloc = (Math.random() * deviceWidth);
      targets[target].yloc = (Math.random() * deviceHeight);
      if ((targets[target].xloc % blockSize) != 0) {
        targets[target].xloc = (targets[target].xloc - (targets[target].xloc % blockSize));
      }
      if ((targets[target].yloc % blockSize) != 0) {
        targets[target].yloc = (targets[target].yloc - (targets[target].yloc % blockSize));
      }
      for (var snakeIndex = 0; snakeIndex < arrayOfSnakes.length; snakeIndex++) {
        for (var blockIndex = 0; blockIndex < arrayOfSnakes[snakeIndex].xloc.length; blockIndex++) {
          if ((Math.abs(arrayOfSnakes[snakeIndex].xloc[blockIndex] - targets[target].xloc) <= blockSize) && (Math.abs(arrayOfSnakes[snakeIndex].yloc[blockIndex] - targets[target].yloc) <= blockSize)) {
            occupied = true;
            break;
          }
        }
      }
    } while (occupied)
  }
}   //End of spawnTarget

function target() {
  this.xloc = 0;
  this.yloc = 0;
}

//Canvas Functions 

function drawSquare(xloc, yloc, color) {
  roundRect(ctx, xloc, yloc, blockSize, blockSize, 5, true, false, color);
}   //End of drawSquare 

function spawnNewSquares(snakeIndex) {
  for (var newBlock = 0; newBlock < numberOfSquaresAdded; newBlock++) {
    var newXloc = (arrayOfSnakes[snakeIndex].xloc[arrayOfSnakes[snakeIndex].xloc.length] - newBlock);
    var newYloc = (arrayOfSnakes[snakeIndex].yloc[arrayOfSnakes[snakeIndex].yloc.length] - newBlock);
    arrayOfSnakes[snakeIndex].xloc.push(newXloc);
    arrayOfSnakes[snakeIndex].yloc.push(newYloc);
  }
}   //End of spawnNewSquares

function resetGame() {
  keypress = [false, false];
  rows = sliderRows.value;
  scale();
  clearInterval(time);
  speed = 101 - sliderSpeed.value;
  numOfTargets = sliderTargets.value;
  numberOfSquaresAdded = sliderAdded.value;
  colorSnake1 = "#FF0000" //document.getElementById("snake1Color").value;
  colorSnake2 = "#00FF00" //document.getElementById("snake2Color").value;
  twoPlayerSnake = false //document.getElementById("twoPlayer").checked;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arrayOfSnake = new Array();
  if (twoPlayerSnake) {
    numberOfSnakes = 2;
  } else {
    numberOfSnakes = 1;
  }
  for (var snakeIndex = 0; snakeIndex < numberOfSnakes; snakeIndex++) {
    arrayOfSnakes[snakeIndex] = new snakeObject(startLocationOfSnakes[snakeIndex].xloc, startLocationOfSnakes[snakeIndex].yloc);
  }
  for (var targetIndex = 0; targetIndex < numOfTargets; targetIndex++) {
    targets[targetIndex] = new target();
  }
  spawnTarget();
  time = setInterval(play, speed);
}   //End of resetGame 

function createArrayOfSnakes() {
  for (var snakeIndex = 0; snakeIndex < numberOfSnakes; snakeIndex++) {
    arrayOfSnakes[snakeIndex] = new snakeObject(startLocationOfSnakes[snakeIndex].xloc, startLocationOfSnakes[snakeIndex].yloc);
  }
}   //End of createArrayOfSnakes

function setSnakeLocation(xlocation, ylocation, snakeNum) {
  startLocationOfSnakes[snakeNum - 1] = { xloc: xlocation, yloc: ylocation };
}   //End of setSnakeLocation

function snakeObject(xlocation, ylocation) {
  this.xloc = [xlocation];
  this.yloc = [ylocation];
  this.xPlaceHolder = new Array();
  this.yPlaceHolder = new Array();
  this.xDirection = 0;
  this.yDirection = 0;
}   //End of snakeObject

function roundRect(ctx, x, y, width, height, radius, fill, stroke, color) {
  if (typeof stroke == "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  }
}