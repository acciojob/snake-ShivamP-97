const gameContainer = document.getElementById("gameContainer");

for (let i = 1; i <= 1600; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  pixel.id = "pixel" + i;
  gameContainer.appendChild(pixel);
}

let snake = [761]; 
let direction = 1;
let score = 0;

const DIR = {
  "ArrowUp": -40,
  "ArrowDown": 40,
  "ArrowLeft": -1,
  "ArrowRight": 1
};

let foodPixelNumber = 0;

function placeFood() {
  if (foodPixelNumber !== 0) {
    document.getElementById("pixel" + foodPixelNumber).classList.remove("food");
  }

  let newFood;
  do {
    newFood = Math.floor(Math.random() * 1600) + 1;
  } while (snake.includes(newFood));

  foodPixelNumber = newFood;

  const foodPixel = document.getElementById("pixel" + foodPixelNumber);
  foodPixel.classList.add("food");
}

function drawSnake() {
  document.querySelectorAll(".snakeBodyPixel")
    .forEach(pixel => pixel.classList.remove("snakeBodyPixel"));

  snake.forEach(id => {
    document.getElementById("pixel" + id).classList.add("snakeBodyPixel");
  });
}

function gameOver() {
  alert("Game Over! Final Score: " + score);
  location.reload();
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
    document.getElementById("pointsEarned").innerText = score;
    placeFood();
  } else {
    snake.pop();
  }

  if (snake.filter(x => x === newHead).length > 1) return gameOver();

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
setInterval(moveSnake, 100); 
