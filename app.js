/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying, prevDiceValue, winScore;
var newWinScoreValue = document.querySelector(".winning-score-value");

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    // dice = 6;

    // 2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    // 3. Update the round score IF the rolled number was not a 1
    if (dice !== 1) {
      // add the score
      roundScore += dice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;

      if (dice === 6 && prevDiceValue === 6) {
        scores[activePlayer] = 0;
        // update the UI
        document.querySelector(`#score-${activePlayer}`).textContent =
          scores[activePlayer];
        nextPlayer();
        return;
      }
      prevDiceValue = dice;
    } else {
      nextPlayer();
    }
  } else {
    console.log("game is finished");
  }
  console.log(dice);
  console.log(prevDiceValue);
  console.log("=======================================");
  // prevDiceValue = dice;
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
    if (scores[activePlayer] >= winScore) {
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
  prevDiceValue = 0;

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
  winScore = 100;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  newWinScoreValue.value = "100";

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

document
  .querySelector(".set-winning-score")
  .addEventListener("click", setWinScore);

function setWinScore() {
  winScore = newWinScoreValue.value;
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
