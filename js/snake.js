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

main()


