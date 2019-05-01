var scores, roundScore, activePlayer, gamePlaying;

init();
var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    // 3. Update the round score IF the rolled number was not a 1
    if (dice === 6 && lastDice === 6) {
      // player loses score
      scores[activePlayer] = 0;
      document.querySelector(`.score-${activePlayer}`).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      // add the score
      roundScore += dice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
    lastDice = dice; // store prev/last dice value
  } else {
    console.log("game is finished");
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // add current score with player global score
    // activePlayer == 0 ? (scores[0] += roundScore) : (scores[1] += roundScore);
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).textContent = "WINNER";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // switch turns
      nextPlayer();
    }
  } else {
    console.log("game is finished");
  }
});

function nextPlayer() {
  // next player
  document.getElementById(`current-${activePlayer}`).textContent = 0;

  // terninary opperator to change the active player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // reset round score
  roundScore = 0;

  // toggle the 'active' class
  document.querySelector(`.player-0-panel`).classList.toggle("active");
  document.querySelector(`.player-1-panel`).classList.toggle("active");

  // hide dice after user turn
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector("#name-0").textContent = "PLAYER 1";
  document.querySelector("#name-1").textContent = "PLAYER 2";

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
}

//
// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// var current = document.querySelector("#score-0");
// current.textContent = dice;
// document.querySelector(`#current-${activePlayer}`).innerHTML = `<em>${dice}</em>`;

// document.querySelector(`#current-${activePlayer}`).textContent // = dice;

// var x = document.querySelector("#score-0").textContent;
// console.log(x);
