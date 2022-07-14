"use strict";

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
let currentPlayer = 1;
let currentScore = 0;
let score1 = 0;
let score2 = 0;

function endGame() {
  currentPlayer === 1
    ? player1El.classList.add("winner")
    : player2El.classList.add("winner");

  btnRollDice.classList.remove("hover");
  btnHold.classList.remove("hover");
  btnHold.disabled = true;
  btnRollDice.disabled = true;
}

function changePlayer() {
  const currentScoreEl = document.getElementById(
    `current-score-${currentPlayer}`
  );
  currentScoreEl.textContent = 0;
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  player1El.classList.toggle("active");
  player2El.classList.toggle("active");
  currentScore = 0;
}

btnRollDice.addEventListener("click", function () {
  diceEl.classList.remove("hidden");

  const dice = Math.floor(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.webp`;

  if (dice === 1) {
    changePlayer();
  } else {
    currentScore += dice;
    document.getElementById(`current-score-${currentPlayer}`).textContent =
      currentScore;
  }
});

btnHold.addEventListener("click", function () {
  currentPlayer === 1 ? (score1 += currentScore) : (score2 += currentScore);
  score1El.textContent = score1;
  score2El.textContent = score2;

  if (score1 >= 100) endGame();
  else if (score2 >= 100) endGame();
  else changePlayer();
});

btnNewGame.addEventListener("click", function () {
  score1El.textContent = score2El.textContent = 0;
  current1El.textContent = current2El.textContent = 0;
  btnRollDice.classList.add("hover");
  btnHold.classList.add("hover");
  btnHold.disabled = false;
  btnRollDice.disabled = false;
  player1El.classList.add("active");
  player2El.classList.remove("active");
  player1El.classList.remove("winner");
  player2El.classList.remove("winner");
  currentPlayer = 1;
  currentScore = score1 = score2 = 0;
});
