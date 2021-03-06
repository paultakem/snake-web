const gameBoard = document.getElementById("gameCanvas");
const gameContext = gameBoard.getContext("2d");
const scoreBoard = document.getElementById("scoreBoard");
const scoreList = document.getElementById("highScoreList")
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const restartBtn = document.getElementById("restartBtn");





let dx = 10;  // horizontal speed
let dy = 0;  // vertical speed 
let food_x;
let food_y;
let score = 0;
let highScoreArray = [];
let paused = false;
let over = false;


// buttens to control game flow (pause, resumre, restart)
pauseBtn.addEventListener('click', function () {
  paused = !paused
});
restartBtn.addEventListener('click', restart);
resumeBtn.addEventListener('click', resume);

//  starting coordinates of the snake rectangles -> middle of the canvas 
let snakeInnit = [{
  // head of the snake 
    x: gameBoard.width / 2,
    y: gameBoard.height / 2
  },
  {
    //2nd body part 
    x: gameBoard.width / 2 - 10,
    y: gameBoard.height / 2 
  },
  {
    //3rd body part
    x: gameBoard.width / 2 - 20,
    y: gameBoard.width / 2 
  },
];


let snake = [{
    x: gameBoard.width / 2,
    y: gameBoard.height / 2
  },
  {
    x: gameBoard.width / 2 - 10,
    y: gameBoard.height / 2 
  },
  {
    x: gameBoard.width / 2 - 20,
    y: gameBoard.width / 2 
  },
];


main();

gen_food();


function restart() {
  scoreBoard.innerHTML = `Score: 0`;
  score = 0;
  snake = Array.from(snakeInnit);
  gen_food();
  if (over) {
    over = false;
    main();
  }

}

function resume() {
  paused = false;
  main();
}

function drawSnakePart(part) {
  gameContext.fillStyle = 'white';
  gameContext.strokestyle = 'black';
  gameContext.fillRect(part.x, part.y, 10, 10);
  gameContext.strokeRect(part.x, part.y, 10, 10);
}

function drawFood() {
  gameContext.fillStyle = 'red';
  gameContext.strokestyle = 'lightred';
  gameContext.fillRect(food_x, food_y, 10, 10);
  gameContext.strokeRect(food_x, food_y, 10, 10);
}




function clearCanvas() {

  gameContext.fillStyle = '#2196f3';
  gameContext.strokestyle = 'black';
  gameContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
  gameContext.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}

function moveSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };
  snake.unshift(head);


  // check if snake touched the food 
  const collided = snake[0].x === food_x &&
    snake[0].y === food_y;

  if (collided) {

    score += 10;

    //generate new food 
    gen_food();
    //set updated score 
    scoreBoard.innerHTML = `Score: ` + score;
  } else {

    snake.pop();
  }
}

function main() {

  while (paused) {
    main();
  }

  if (gameOver()) {
    over = true;
    highScoreArray.push(score);

    let scoreListHTML = ``;
    highScoreArray.forEach(element => {
      scoreListHTML += `<li> ${element} </li>`;
    });


    scoreList.innerHTML = scoreListHTML;
    scoreBoard.innerHTML = `Score: 0`;
    score = 0;
    return;
  }


  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();

    main();
  }, 200)
}


function snakeControl(event) {

  const A_KEY = 65;
  const W_KEY = 87;
  const S_KEY = 83;
  const D_KEY = 68;

  const keyPressed = event.keyCode;

  const goLeft = dx === -10;
  const goRight = dx === 10;
  const goUp = dy === -10;
  const goDown = dy === 10;

  if (keyPressed === A_KEY && !goRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === W_KEY && !goDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === S_KEY && !goUp) {
    dx = 0;
    dy = 10;
  }

  if (keyPressed === D_KEY && !goLeft) {
    dx = 10;
    dy = 0;
  }

}

document.addEventListener('keydown', snakeControl);

function gameOver() {

  for (let c = 3; c < snake.length; c++) {
    const collided = snake[c].x === snake[0].x &&
      snake[c].y === snake[0].y;

    if (collided) {
      return true;
    }
  }

  const hitLeft = snake[0].x < 0;
  const hitRight = snake[0].x > gameBoard.width - 10;
  const hitTop = snake[0].y < 0;
  const hitBottom = snake[0].y > gameBoard.height - 10;

  return hitLeft || hitRight || hitTop || hitBottom;

}


function food_coord(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;

}

function gen_food() {

  food_x = food_coord(0, gameBoard.width - 10);
  food_y = food_coord(0, gameBoard.height - 10);

  snake.forEach(part => {
    const eaten = part.x == food_x && part.y == food_y;
    if (eaten) {
      gen_food();
    }

  })
}