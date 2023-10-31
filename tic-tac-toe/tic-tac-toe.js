//Add AI for the computer to randomly play in a non-occupied tile

const gameBoardDiv = document.querySelector('.js-gameboard');
const gameBoard = ["", "", "", "", "", "", "", "", ""];
const tiles = document.querySelectorAll('.js-tile');
const restartButton = document.querySelector('.js-restart-button');
const resetButton = document.querySelector('.js-reset-button');
const player1Js = document.querySelector('.js-player1wins');
const player2Js = document.querySelector('.js-player2wins');
const jsTies = document.querySelector('.js-ties');

let playerTurn = 1;

const results = JSON.parse(localStorage.getItem('results')) || {
  player1wins: 0,
  player2wins: 0,
  ties: 0,
};

function updateResults() {
  player1Js.innerHTML = `Player 1 (x) wins: ${results.player1wins}`;
  player2Js.innerHTML = `Player 2 (o) wins: ${results.player2wins}`;
  jsTies.innerHTML = `Ties: ${results.ties}`;

  localStorage.setItem('results', JSON.stringify(results));
}

function updateGameBoard() {
  tiles.forEach((tile, index) => {
    tile.textContent = gameBoard[index];
  });
}

function handleTileClick(event) {
  const tileIndex = event.target.getAttribute('data-index');

  if (playerTurn === 1) {
    if (gameBoard[tileIndex] === "") {
      gameBoard[tileIndex] = "X";
      playerTurn = 2;
    } else if (gameBoard[tileIndex] === "X" || gameBoard[tileIndex] === "O") {
      return;
    }
  } else if (playerTurn === 2) {
    if (gameBoard[tileIndex] === "") {
      gameBoard[tileIndex] = "O";
      playerTurn = 1;
    } else if (gameBoard[tileIndex] === "X" || gameBoard[tileIndex] === "O") {
      return;
    }
  }

  updateGameBoard();

  setTimeout(function () {
    const winner = checkForVictory();
    if (winner) {
      results[winner.toLowerCase() + 'wins'] += 1;
      updateResults();
      alert(`Player ${winner} wins!`);
      restartGame();
      playerTurn = 1;
    }
  }, 200); // Delay time for the "winning" point to appear on the screen...

  setTimeout(checkForTie, 200);
}

function checkForVictory() {
  const victoryConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const condition of victoryConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] === "X" && gameBoard[b] === "X" && gameBoard[c] === "X") {
      results.player1wins += 1;
      updateResults();
      return "X";
    }
    if (gameBoard[a] === "O" && gameBoard[b] === "O" && gameBoard[c] === "O") {
      results.player2wins += 1;
      updateResults();
      return "O";
    }
  }

  return null;
}

function checkForTie() {
  if (
    gameBoard[0] !== "" &&
    gameBoard[1] !== "" &&
    gameBoard[2] !== "" &&
    gameBoard[3] !== "" &&
    gameBoard[4] !== "" &&
    gameBoard[5] !== "" &&
    gameBoard[6] !== "" &&
    gameBoard[7] !== "" &&
    gameBoard[8] !== "" &&
    checkForVictory() === null
  ) {
    results.ties += 1;
    updateResults();
    alert(`It's a tie!`);
    restartGame();
    playerTurn = 1;
  }
}

function restartGame() {
  tiles.forEach((tile, index) => {
    tile.textContent = "";
    gameBoard[index] = "";
    playerTurn = 1;
  });
}

tiles.forEach((tile) => {
  tile.addEventListener("click", handleTileClick);
});

restartButton.addEventListener('click', restartGame);

resetButton.addEventListener('click', function () {
  results.player1wins = 0;
  results.player2wins = 0;
  results.ties = 0;
  updateResults();
});

updateResults();
