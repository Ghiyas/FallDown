/////////////////////////////////////////////////////////////////
var canvas;
var ctx;
//var canvas2;
//var ctx2;
//var canvas3;
//var ctx3;
/////////////////////////////////////////////////////////////////
var ballY = 50;
var ballX = 180;
var vSpeed = 7.5;
/////////////////////////////////////////////////////////////////
var platform;
var circle;
var fps = 60;
var score = 0;
/////////////////////////////////////////////////////////////////
var isPlaying = false;
var lbShow = false;
var settingsShow = false;
var gameOver = false;
/////////////////////////////////////////////////////////////////
window.onload = function () {
  canvas = document.getElementById('gamesCanvas');
  ctx = canvas.getContext('2d');
//  canvas2 = document.getElementById('gamesCanvas2');
//  ctx2 = canvas2.getContext('2d');
//  canvas3 = document.getElementById("gamesCanvas3");
//  ctx3 = canvas3.getContext("2d");
  setInterval(function(){
    if(isPlaying){
      displayScore();          
    }    
  }, 2000/fps)
  createMenu();
  canvas.addEventListener('click', getClicks.bind(this), false);
    
}
/////////////////////////////////////////////////////////////////
function initialise(){
  isPlaying = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createRect(0,0, canvas.width, canvas.height, 'black');
}

function moveBall(){
  ballY = (ballY + vSpeed)
//  sctx.clearRect(0,0, canvas.width, canvas.height); 
}
////////////////////////////////////////////////////////////////
function background(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function createRect(leftX, topY, width, height, color){
  ctx.fillStyle = color;
  ctx.fillRect(leftX, topY, width, height);
}

function createText(font, color, value, posX, posY){
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(value, posX, posY)
}

function drawBall(){
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ballX, dY, 8.5, 0, Math.PI*2, true);
  ctx.fill();
  //moveBall();
}

function displayScore(){
  score = score + 1;
  ctx.font = "20px Consolas"
  ctx.fillStyle = 'white';
  ctx.fillText("Score: " +score, 8, 20);
}

function createMenu(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background("black");
  if (!isPlaying){
    createText("60px monospace", "white", "FallDown", 40, 130);
    createText("34px Arial", "white", "PLAY", 130, 260);
    createText("34px Arial", "white", "LEADERBOARD", 50, 340);
    createText("34px Arial", "white", "SETTINGS", 90, 420);
  }
}

function lbScreen(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createRect(0,0, canvas.width, canvas.height, 'black');
  if (!isPlaying){
    lbShow = true;
    createText("45px monospace", "white", "LEADERBOARD", 45, 100);
    createText("20px Arial", "white", "BACK", 10, 25);
  }
}

function settingsMenu(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createRect(0,0, canvas.width, canvas.height, 'black'); 
  if(!isPlaying){
    settingsShow = true;
    createText("60px monospace", "white", "SETTINGS", 40, 130);
    createText("33px Arial", "white", "CONTROLS", 80, 190);
    createText("20px Arial", "white", "KEYBOARD", 35, 225);
    createText("20px Arial", "white", "MOUSE", 240, 225);
    createText("20px Arial", "white", "BACK", 10, 25);
  }
}

function gameOverScreen(){
  var gameOver = true;
  background("black");
  createText("70px monospace", "white", "GAMEOVER", 25, 100);
  createText("30px Arial", "white", "ENTER YOUR NAME", 35, 225);
  createText("20px Arial", "white", "SUBMIT", 140, 330); 
  var name = document.getElementById('name');
  if (gameOver){
    var showBox = document.getElementById('name');
    showBox.style.visibility = 'visible';
  }
}
////////////////////////////////////////////////////////////////
function getClicks(evt) {
    var x = evt.offsetX;
    var y = evt.offsetY;
    if(!gameOver){
      if ((x > 110 && x < 240) && (y > 220 && y < 275) && !isPlaying) {
        initialise()
      }
      else if ((x > 30 && x < 320) && (y > 300 && y < 350) && !isPlaying){
        lbScreen()
      }
      else if ((x > 80  && x < 270) && (y > 380 && y < 430) && !isPlaying){
        settingsMenu()
      } 
      else if ((x > 10 && x < 70) && (y > 0 && y < 30 ) && lbScreen){
        createMenu();    
      }    
      else if ((x > 10 && x < 70) && (y > 0 && y < 30 ) && settingsMenu){
        createMenu();    
      }
    }
    else{
      if ((x > 130 && x < 240) && (y > 320 && y < 355) && gameOver){
        var gameOver = false;
        showBox.style.visibility = 'hidden';
        createMenu();
      }
    }
}
/////////////////////////////////////////////////////////////////
