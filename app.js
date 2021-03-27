const snakeboard = document.getElementById("snakeboard");
const ctx = snakeboard.getContext("2d");

const board_bor = 'black';
const board_bg = "aqua";
const snake_col = 'lightblue';
const snake_bor = 'dodgerblue';

const foodImg = new Image();
foodImg.src = "images/food.png";

const unit = 20;

let snake = [
  { x: 20 * unit, y: 15 * unit },
]

let food = {
  x: Math.floor(Math.random() * 40) * unit,
  y: Math.floor(Math.random() * 30) * unit
}
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let hs = new Audio();
dead.src = "sound/dead.mp3";
eat.src = "sound/eat.mp3";
up.src = "sound/up.mp3";
right.src = "sound/right.mp3";
left.src = "sound/left.mp3";
down.src = "sound/down.mp3";
hs.src= "sound/highscore.mp3";
let score = 0;

let dir;

document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  event.preventDefault();
  if (key == 37 && dir != "RIGHT") {
    dir = "LEFT";    
    left.play();
  } 
  else if (key == 38 && dir != "DOWN") {
    dir = "UP";
    up.play();    
  } 
  else if (key == 39 && dir != "LEFT") {
    dir = "RIGHT";
    right.play();
  } 
  else if (key == 40 && dir != "UP") {
    dir = "DOWN";
    down.play();
  }
}
function collision(head, body) {
  for (let i = 0; i < body.length; i++) {
    if (head.x == body[i].x && head.y == body[i].y) {
      return true;
    }
  }
  return false;
}
function createCanvas() {
  ctx.fillStyle = board_bg;
  ctx.strokestyle = board_bor;
  ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

game();
function game() {
  document.getElementById("new").style.visibility="hidden";  
  document.getElementById("dif").style.visibility="hidden";
  createCanvas();  
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = snake_col;
    ctx.strokestyle = snake_bor;
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }
  ctx.drawImage(foodImg, food.x, food.y);
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  switch(dir){
    case "LEFT": snakeX -= unit; break;
    case "UP": snakeY -= unit; break;
    case "RIGHT": snakeX += unit; break;
    case "DOWN": snakeY += unit; break;    
  } 

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 40) * unit,
      y: Math.floor(Math.random() * 30) * unit
    }
  }
  else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }
   
  if (snakeX < 0 || snakeX > 39 * unit || snakeY < 0 || snakeY > 29 * unit || collision(newHead, snake)) {
    clearInterval(rep);
    document.getElementById("new").style.visibility="visible";  
    document.getElementById("dif").style.visibility="visible";
    dir=null;    
    dead.play();    
    let high_score = document.getElementById('hs');
    if (high_score.innerHTML < score) {      
      high_score.innerHTML=score; 
      hs.play();
      setInterval(confirm("New High Score"),7);
    } 
    document.removeEventListener("keydown", direction);   
  }

  snake.unshift(newHead);
  document.getElementById('value').innerHTML = score;
}
let rep = setInterval(game, 100);

function newgame(){
  snake = [
    { x: 20 * unit, y: 15 * unit },
  ]

  food = {
    x: Math.floor(Math.random() * 40) * unit,
    y: Math.floor(Math.random() * 30) * unit
  }

  score=0;

  document.addEventListener("keydown", direction);
  game();
  rep =setInterval(game,100);
}

function inc_diff(){  
  snake = [
    { x: 20 * unit, y: 15 * unit },
  ]

  food = {
    x: Math.floor(Math.random() * 40) * unit,
    y: Math.floor(Math.random() * 30) * unit
  }
  
  score=0;
  
  document.addEventListener("keydown", direction);
  game();
  rep =setInterval(game,50);
}

