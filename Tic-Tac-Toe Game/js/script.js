console.log("Welcome to my Tic-Tac-Toe game");
// let music= new Audio("");
let turnMusic = new Audio("ZN6M58Y-sword-slash-a.mp3");
// let gameOverMusic = new Audio("");
let turn = "X";
let isGameOver = false;

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Function to check for  a win
const checkWin = () => {
  let boxText = document.getElementsByClassName("boxText"); // To access the box texts inside the span tag
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxText[e[0]].innerHTML === boxText[e[1]].innerHTML &&
      boxText[e[2]].innerHTML === boxText[e[1]].innerHTML &&
      boxText[e[0]].innerHTML !== "" // If all the three elements, i.e. e[0], e[1], e[2], in a line are equal and if any of these three elements, here let's check with the e[0], is not null, the element wins.
    ) {
      document.querySelector(".info").innerHTML =
        boxText[e[0]].innerHTML + " Won"; // To display the element won
      isGameOver = true;
      document
        .querySelector(".imgBox")
        .getElementsByTagName("img")[0].style.width = "200px"; // To display the gif after winning
      document.querySelector(".line").style.width = "20vw"; // To display the line after winning
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
    }
  });
};

// Main logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxText");
  element.addEventListener("click", () => {
    if (boxText.innerHTML === "") {
      boxText.innerHTML = turn; // When the initial box text is null, i.e. when the condition in the ternary statement above is false (as the box text is not X), the X (else block stmt in the above ternary stmt) will be displayed as the box text, after clicking.
      turn = changeTurn(); // Then the box texts will be turned after every click as per the previous box text and the ternary stmt.
      turnMusic.play();
      checkWin();
      if (!isGameOver) {
        document.getElementsByClassName("info")[0].innerHTML =
          "Turn for " + turn; // If game is not over, i.e. isGameOver remains false, then keep displaying the turn status.
      }
    }
  });
});

// Add click listener to reset button
reset.addEventListener("click", () => {
  boxText = document.querySelectorAll(".boxText"); // To select all the box texts to disappear when the reset button is clicked
  Array.from(boxText).forEach((element) => {
    element.innerHTML = ""; // To disappear all the box texts
  });

  // To restart the game and reset the values
  turn = "X";
  isGameOver = false;
  document.getElementsByClassName("info")[0].innerHTML = "Turn for " + turn;
  document.querySelector(".line").style.width = "0vw"; // To hide the gif after reset
  document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width =
    "0px"; // To hide the gif after reset
});
