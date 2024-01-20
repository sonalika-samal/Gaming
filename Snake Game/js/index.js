// Game variables

let inputDir = { x: 0, y: 0 }; // Here x and y defines the x-axis and y-axis positions from left-right and top-bottom direction respectively.
const eatingSound = new Audio("ZN6M58Y-sword-slash-a.mp3");
const gameOverSound = new Audio("9E8C7YR-retro-game-game-over.mp3");
const moveSound = new Audio("F54NG8E-magic-game-shield-guard.mp3");
// const musicSound = new Audio("");
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };
let score = 0;
let hiScoreVal = 0;
// let highScoreBox = document.querySelector("#highScoreBox");

// Game functions

// let's first set the screen play speed of the game.
function main(ctime) {
  window.requestAnimationFrame(main); // requestAnimationFrame() produces higher quality animation completely eliminating frame skips, flickers and shears that can happen when using setTimeout() or setInterval().
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    // Here the (currentTime-lastPaintTime) indicates the duration between the screen paints and defines the speed of the moves and is generally in miliseconds (so we divided 1000 so as to convert it into seconds format as we take the speed variable in seconds.)
    return;
  }
  lastPaintTime = ctime; // To update the last paint time
  gameEngine(); // To run the game
}

function isCollide(snake) {
  // If the snake bump into itself, the game will be over.
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // If the snake bump into the wall, the game will be over.
  if (
    snake[0].x >= 20 || snake[0].x <= 0 && snake[0].y >= 20 || snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  // Updating the snake array and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    // musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over.. Press any key to play again..");
    snakeArr = [{ x: 13, y: 15 }]; // To restart the game from the initial situations after pressing the key
    // musicSound.play();
    score = 0;
  }

  // When the snake eats the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    eatingSound.play();
    score += 1; // To increment the score
    if (score > hiScoreVal) {
      hiScoreVal = score;
      localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
      hiScore.innerHTML = "High Score:" + hiScoreVal; // As described in the main logic section
    }
    scoreBox.innerHTML = "Score:" + score; // To display the score
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    }); // When the snake head and the food element are in the same grid, i.e. when the snake eats the food, add a new snake head in the starting of the snake array using the unshift method.
    let a = 2;
    let b = 18;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }; // When the snake eats the food, generate a new position for the food to disappear the food from the previous position
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }; // ... is used to avoid the reference problem.
  } // To move forward the snake array elements by starting the iteration from the second last element of the snake array, i.e. starting from placing the second last element in the place of the last element of the snake array, to placing the first element in the place of the second element
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y; // To place the snake head in the first position that is left blank after the above iterations.

  // Displaying the snake array and food
  // Displaying the snake array
  board.innerHTML = ""; // To empty the inner HTML
  snakeArr.forEach((e, index) => {
    // to iterate through each element in the snake array
    snakeElement = document.createElement("div"); // To create a snake element
    snakeElement.style.gridRowStart = e.y; // To move the snake element along the rows or in a top-bottom manner or in y-axis
    snakeElement.style.gridColumnStart = e.x; // To move the snake element along the columns or in a left-right manner or in x-axis
    if (index === 0) {
      snakeElement.classList.add("head"); // To add a new class named 'head' as the first element of the snake array
    } else {
      snakeElement.classList.add("snake"); // To add a new class named 'snake' as the other elements of the snake array
    }
    board.appendChild(snakeElement); // To add the snake element on the board as a child
  });

  // Displaying the food
  foodElement = document.createElement("div"); // To create a food element
  foodElement.style.gridRowStart = food.y; // To move the food element along the rows or in a top-bottom manner or in y-axis
  foodElement.style.gridColumnStart = food.x; // To move the food element along the columns or in a left-right manner or in x-axis
  foodElement.classList.add("food"); // To add a new class named 'food'
  board.appendChild(foodElement); // To add the food element on the board as a child
}

// Main logic
// musicSound.play();
let hiScore = localStorage.getItem("hiScore"); // To declare the variable 'hiScore'
if (hiScore === null) {
  hiScoreVal = 0; // To declare the variable 'hiScoreVal'
  localStorage.setItem("hiScore", JSON.stringify(hiScoreVal)); // To store the value of the variable 'hiScoreVal' in the variable 'hiScore' as the high score value in the string format in the local storage
} else {
  hiScoreVal = JSON.parse(hiScore); // To keep the values of the variable 'hiScore' and the variable 'hiScoreVal' same
  hiScore.innerHTML = "High Score:" + hiScoreVal; // To display the high score on screen
}
window.requestAnimationFrame(main);
window.addEventListener("keydown" /*Event*/, (e) => /*Arrow function*/ {
  inputDir = { x: 0, y: 1 }; // When any key is clicked the snake will start moving down in the y-axis.
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
