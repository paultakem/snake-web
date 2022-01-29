const gameBoard = document.getElementById("gameCanvas");
const gameContext = gameBoard.getContext("2d");

let dx = 10;
let dy = 0;

let snake = [  {x: 250, y: 250}, 
               {x: 240, y: 250}, 
               {x: 230, y: 250},
            ];



function drawSnakePart(part){
    gameContext.fillStyle = 'white';  
    gameContext.strokestyle = 'black';
    gameContext.fillRect(part.x, part.y, 10,10);
    gameContext.strokeRect(part.x, part.y, 10,10);
}


function clearCanvas() {
      
    gameContext.fillStyle = 'lightblue';
    gameContext.strokestyle = 'black';
    gameContext.fillRect(0, 0, 500, 500);
     gameContext.strokeRect(0, 0, 500, 500);
      }

function drawSnake(){
    snake.forEach(drawSnakePart)
}

function moveSnake() 
{  
   const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  snake.pop();
}

function main() 
{  
   setTimeout(function onTick() 
   {    
     clearCanvas();    
     moveSnake();  
     drawSnake();
     
     main();
   }, 100)
}

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

document.addEventListener('keydown', snakeControl)

main();


