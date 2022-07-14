"use strict";

let diceNo = 1;
const diceEl = document.querySelector(".dice");
const btnRollDice = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnNewGame = document.querySelector(".btn-new-game");
const player1El = document.getElementById("player-1");
const player2El = document.getElementById("player-2");
const current1El = document.getElementById("current-score-1");
const current2El = document.getElementById("current-score-2");
const score1El = document.getElementById("score-1");
const score2El = document.getElementById("score-2");
let currentPlayer = player1El;
let currentScore = 0;
let score1 = 0;
let score2 = 0;

function changePlayer() {
  currentPlayer.classList.remove("active");
  if (currentPlayer === player1El) {
    current1El.textContent = 0;
    currentPlayer = player2El;
  } else {
    current2El.textContent = 0;
    currentPlayer = player1El;
  }
  currentScore = 0;
  currentPlayer.classList.add("active");
}

function announceWin(player) {
  player === 1
    ? player1El.classList.add("winner")
    : player2El.classList.add("winner");

  btnRollDice.classList.remove("hover");
  btnHold.classList.remove("hover");
  btnHold.disabled = true;
  btnRollDice.disabled = true;
}

function checkWinner() {
  if (score1 >= 100) announceWin(1);
  else if (score2 >= 100) announceWin(2);
  else changePlayer();
}

function updateScore() {
  if (currentPlayer === player1El) {
    score1 += currentScore;
    score1El.textContent = score1;
  } else {
    score2 += currentScore;
    score2El.textContent = score2;
  }
  checkWinner();
}

function updateCurrentScore() {
  currentPlayer === player1El
    ? (current1El.textContent = currentScore)
    : (current2El.textContent = currentScore);
}

function reset() {
  score1El.textContent = score2El.textContent = 0;
  current1El.textContent = current2El.textContent = 0;
  btnRollDice.classList.add("hover");
  btnHold.classList.add("hover");
  btnHold.disabled = false;
  btnRollDice.disabled = false;
  currentPlayer.classList.remove("active");
  currentPlayer.classList.remove("winner");
  currentPlayer = player1El;
  currentScore = score1 = score2 = 0;
  currentPlayer.classList.add("active");
}

btnRollDice.addEventListener("click", function () {
  diceEl.classList.remove("hidden");
  diceNo = Math.floor(Math.random() * 6) + 1;
  diceEl.src = `dice-${diceNo}.webp`;
  if (diceNo === 1) {
    changePlayer();
  } else {
    currentScore += diceNo;
    updateCurrentScore();
  }
});

btnHold.addEventListener("click", updateScore);

btnNewGame.addEventListener("click", reset);
