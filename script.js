"use strict";

const diceEl = document.querySelector(".dice");
const btnRollDice = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnNewGame = document.querySelector(".btn-new-game");
const player0El = document.getElementById("player-0");
const player1El = document.getElementById("player-1");
const current0El = document.getElementById("current-score-0");
const current1El = document.getElementById("current-score-1");
const score0El = document.getElementById("score-0");
const score1El = document.getElementById("score-1");
let currentPlayer, currentScore, scores;

function init() {
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  player0El.classList.remove("winner");
  player1El.classList.remove("winner");

  player0El.classList.add("active");
  player1El.classList.remove("active");

  score0El.textContent = score1El.textContent = 0;
  current0El.textContent = current1El.textContent = 0;

  btnRollDice.classList.add("hover");
  btnHold.classList.add("hover");
  btnHold.disabled = false;
  btnRollDice.disabled = false;

  diceEl.classList.add("hidden");
}

init();

function changePlayer() {
  document.getElementById(`current-score-${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle("active");
  player1El.classList.toggle("active");
  currentScore = 0;
}

function endGame() {
  document.getElementById(`player-${currentPlayer}`).classList.add("winner");

  btnRollDice.classList.remove("hover");
  btnHold.classList.remove("hover");
  btnHold.disabled = true;
  btnRollDice.disabled = true;
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
  scores[currentPlayer] += currentScore;
  document.getElementById(`score-${currentPlayer}`).textContent =
    scores[currentPlayer];

  if (scores[currentPlayer] >= 100) endGame();
  else changePlayer();
});

btnNewGame.addEventListener("click", init);
