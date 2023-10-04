"use strict";

let playerText = document.querySelector("#playerText");
let restartBtn = document.querySelector(".restart-btn");
let boxes = Array.from(document.getElementsByClassName("tick-box"));

let winnerInducator = getComputedStyle(document.body).getPropertyValue(
  "--winner-blocks"
);

const oText = "O";
const xText = "X";
let currentPlayer = xText;
let currentColor;

let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id] && !playerHasWon()) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    currentColor = currentPlayer == xText ? "#fa5252" : "#4dabf7";

    e.target.style.color = currentColor;

    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has won!`;
      let winningBlocks = playerHasWon();

      winningBlocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerInducator)
      );
      return;
    }

    currentPlayer = currentPlayer == xText ? oText : xText;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerText = "Tic Tac Toe";

  currentPlayer = xText;
}

startGame();
