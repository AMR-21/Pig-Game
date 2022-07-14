"use strict";

let diceNo = 1;
const dice = document.querySelector(".dice");
const rollDice = document.querySelector(".btn-roll");
const hold = document.querySelector(".btn-hold");
const newGame = document.querySelector(".btn-new-game");
const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");
const current1 = document.getElementById("current-score-1");
const current2 = document.getElementById("current-score-2");
const score1 = document.getElementById("score-1");
const score2 = document.getElementById("score-2");
let currentPlayer = player1;
let currentScore = current1;

function changePlayer() {
  currentPlayer.classList.remove("active");
  currentScore.textContent = 0;
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  currentScore = currentScore === current1 ? current2 : current1;
  currentPlayer.classList.add("active");
}

function announceWin(player) {
  player === 1
    ? player1.classList.add("winner")
    : player2.classList.add("winner");

  rollDice.classList.remove("hover");
  hold.classList.remove("hover");
  hold.disabled = true;
  rollDice.disabled = true;
}

function checkWinner() {
  if (Number(score1.textContent) >= 100) announceWin(1);
  else if (Number(score2.textContent) >= 100) announceWin(2);
  else changePlayer();
}

function updateScore() {
  currentPlayer === player1
    ? (score1.textContent =
        Number(score1.textContent) + Number(currentScore.textContent))
    : (score2.textContent =
        Number(score2.textContent) + Number(currentScore.textContent));
  checkWinner();
}

function reset() {
  score1.textContent = score2.textContent = 0;
  current1.textContent = current2.textContent = 0;
  rollDice.classList.add("hover");
  hold.classList.add("hover");
  hold.disabled = false;
  rollDice.disabled = false;
  currentPlayer.classList.remove("active");
  currentPlayer.classList.remove("winner");
  currentPlayer = player1;
  currentScore = current1;
  currentPlayer.classList.add("active");
}

rollDice.addEventListener("click", function () {
  dice.classList.remove("hidden");
  diceNo = Math.floor(Math.random() * 6) + 1;
  dice.src = "dice-" + String(diceNo) + ".webp";
  if (diceNo === 1) {
    changePlayer();
  } else {
    currentScore.textContent = diceNo + Number(currentScore.textContent);
  }
});

hold.addEventListener("click", updateScore);

newGame.addEventListener("click", reset);
