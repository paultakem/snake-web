const gameBoard = document.getElementById("gameCanvas");
const gameContext = gameBoard.getContext("2d");


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

function drawSnake(){
    snake.forEach(drawSnakePart)
}

drawSnake()