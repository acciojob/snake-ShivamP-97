const gameContainer = document.getElementById("gameContainer");
for (let i = 1; i <= 1600; i++) {
  const px = document.createElement("div");
  px.classList.add("pixel");
  px.id = "pixel" + i;
  gameContainer.appendChild(px);
}

let snake = [761];
let direction = 1; 
let score = 0;
let foodPixelNumber = 0;
let firstFood = true;

function placeFood() {
  if (foodPixelNumber) {
    document.getElementById("pixel" + foodPixelNumber).classList.remove("food");
  }

  if (firstFood) {
    foodPixelNumber = snake[0] + 1;
    firstFood = false;
  } else {
    do {
      foodPixelNumber = Math.floor(Math.random() * 1600) + 1;
    } while (snake.includes(foodPixelNumber));
  }

  document.getElementById("pixel" + foodPixelNumber).classList.add("food");
}

function drawSnake() {
  document.querySelectorAll(".snakeBodyPixel")
    .forEach(px => px.classList.remove("snakeBodyPixel"));

  snake.forEach(id => {
    document.getElementById("pixel" + id).classList.add("snakeBodyPixel");
  });
}

function gameOver() {
  console.log("Game Over:", score);
  clearInterval(gameLoop);
}

function moveSnake() {
  const head = snake[0];
  const newHead = head + direction;

  if (direction === -1 && head % 40 === 1) return gameOver();
  if (direction === 1 && head % 40 === 0) return gameOver();
  if (direction === -40 && head <= 40) return gameOver();
  if (direction === 40 && head > 1560) return gameOver();

  snake.unshift(newHead);

  if (newHead === foodPixelNumber) {
    score++;
    document.getElementById("pointsEarned").textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  if (snake.filter(x => x === newHead).length > 1) return gameOver();

  drawSnake();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== 40) direction = -40;
  if (e.key === "ArrowDown" && direction !== -40) direction = 40;
  if (e.key === "ArrowLeft" && direction !== 1) direction = -1;
  if (e.key === "ArrowRight" && direction !== -1) direction = 1;
});

drawSnake();
placeFood();
moveSnake();  

const gameLoop = setInterval(moveSnake, 100);
