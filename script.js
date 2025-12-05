const gameContainer = document.getElementById("gameContainer");

for (let i = 1; i <= 1600; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  pixel.id = "pixel" + i;
  gameContainer.appendChild(pixel);
}

let snake = [761, 760]; 
let direction = 1; 
let score = 0;
let foodPixelNumber = 0;

const DIR = {
  ArrowUp: -40,
  ArrowDown: 40,
  ArrowLeft: -1,
  ArrowRight: 1,
};

let firstFood = true;

function placeFood() {
  if (foodPixelNumber !== 0) {
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
  document.querySelectorAll(".snakeBodyPixel").forEach((px) => {
    px.classList.remove("snakeBodyPixel");
  });

  snake.forEach((pxId) => {
    document.getElementById("pixel" + pxId).classList.add("snakeBodyPixel");
  });
}

function gameOver() {
  console.log("Game Over:", score);
  clearInterval(gameLoop); 
}

function moveSnake() {
  let head = snake[0];
  let newHead = head + direction;

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

  if (snake.filter((x) => x === newHead).length > 1) return gameOver();

  drawSnake();
}

document.addEventListener("keydown", (e) => {
  if (!DIR[e.key]) return;

  if (direction === 1 && e.key === "ArrowLeft") return;
  if (direction === -1 && e.key === "ArrowRight") return;
  if (direction === 40 && e.key === "ArrowUp") return;
  if (direction === -40 && e.key === "ArrowDown") return;

  direction = DIR[e.key];
});

drawSnake();
placeFood();

const gameLoop = setInterval(moveSnake, 100); 
