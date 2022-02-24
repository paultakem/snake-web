const gameBoard = document.getElementById("gameCanvas");
const gameContext = gameBoard.getContext("2d");
const scoreBoard = document.getElementById("scoreBoard");


let dx = 10;
let dy = 0;
let food_x;
let food_y;
let score = 0;
let highScoreArray;

let snake = [  {x: gameBoard.width/2, y: gameBoard.height/2}, 
               {x: gameBoard.width/2-10, y: gameBoard.height/2-10}, 
               {x: gameBoard.width/2-20, y: gameBoard.width/2-20},
            ];


main();

gen_food();



function drawSnakePart(part){
    gameContext.fillStyle = 'white';  
    gameContext.strokestyle = 'black';
    gameContext.fillRect(part.x, part.y, 10,10);
    gameContext.strokeRect(part.x, part.y, 10,10);
}

function drawFood(){
  gameContext.fillStyle = 'red';  
  gameContext.strokestyle = 'lightred';
  gameContext.fillRect(food_x, food_y, 10,10);
  gameContext.strokeRect(food_x, food_y, 10,10);
}




function clearCanvas() {
      
    gameContext.fillStyle = '#2196f3';
    gameContext.strokestyle = 'black';
    gameContext.fillRect(0, 0, gameBoard.width, gameBoard.height );
     gameContext.strokeRect(0, 0, gameBoard.width, gameBoard.height);
      }

function drawSnake(){
    snake.forEach(drawSnakePart)
}

function moveSnake() 
{  
   const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

const collided = snake[0].x === food_x && 
snake[0].y === food_y;

if(collided){

  score += 10;

gen_food();
scoreBoard.innerHTML = `Score: `+ score;
} else {

  snake.pop();
}
}

function main() 
{  
  if(gameOver()){
    // highScoreArray.push(score);
    // highScoreArray.sort();
    // buildHighScoreList(highScoreArray);
    return
  }


   setTimeout(function onTick() 
   {    
     clearCanvas();    
     drawFood();
     moveSnake();  
     drawSnake();
     
     main();
   }, 200)
}

// function buildHighScoreList(score){

//   score.forEach(el => {
//     let entry = document.createElement('li');
//     entry.appendChild(document.createTextNode(el));
//     score.appendChild(entry);
//   });
// }

function snakeControl(event){

  const A_KEY = 65;
  const W_KEY = 87;
  const S_KEY = 83;
  const D_KEY = 68;

const keyPressed = event.keyCode;

const goLeft = dx === -10;
const goRight = dx === 10;
const goUp = dy === -10;
const goDown = dy === 10;

if (keyPressed === A_KEY && !goRight)
{
  dx = -10;
  dy = 0;
}

if (keyPressed === W_KEY && !goDown)
{
  dx = 0;
  dy = -10;
}

if(keyPressed === S_KEY && !goUp)
{
  dx = 0;
  dy = 10;
}

if(keyPressed === D_KEY && !goLeft)
{
  dx = 10;
  dy = 0;
}

}

document.addEventListener('keydown', snakeControl);

function gameOver(){

  for(let c = 3; c < snake.length; c++)
  {
  const collided = snake[c].x === snake[0].x && 
  snake[c].y === snake[0].y;

  if(collided)
  {
  return true;
  }
}

  const hitLeft = snake[0].x < 0;
  const hitRight = snake[0].x > gameBoard.width- 10;
  const hitTop = snake[0].y < 0;
  const hitBottom = snake[0].y > gameBoard.height-10;

  return hitLeft || hitRight || hitTop || hitBottom;

  }


  function food_coord(min, max){
return Math.round((Math.random() * (max - min) + min) / 10 ) * 10;

  }

  function gen_food(){

  food_x = food_coord(0, gameBoard.width - 10);
  food_y = food_coord(0, gameBoard.height - 10);

  snake.forEach( part => {
const eaten = part.x == food_x && part.y == food_y;
if(eaten) {
  gen_food();
}

  })


  }
