divBoard = document.getElementById('board');

let rows = 5;
let cols = 5;

let minesweeperBoard = [
  [1, 0, 0, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 1],
	[0, 0, 0, 0],
	[0, 0, 1, 0]
];

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let tile = document.createElement('div');
    tile.classList.add('tile');

    let bomb = 0;

    if (minesweeperBoard[i][j] === 1) {
      tile.classList.add('mine');
      tile.innerText = " * ";
    } else {
      if (j > 0 && minesweeperBoard[i][j - 1] === 1) {
        bomb += 1;
      }
      if (j < minesweeperBoard[i].length - 1 && minesweeperBoard[i][j + 1] === 1) {
        bomb += 1;
      }
      if (i > 0 && minesweeperBoard[i - 1][j] === 1) {
        bomb += 1;
      }
      if (i < minesweeperBoard.length - 1 && minesweeperBoard[i + 1][j] === 1) {
        bomb += 1;
      }
      if (i > 0 && j > 0 && minesweeperBoard[i - 1][j - 1] === 1) {
        bomb += 1;
      }
      if (i < minesweeperBoard.length - 1 && j < minesweeperBoard[i].length - 1 && minesweeperBoard[i + 1][j + 1] === 1) {
        bomb += 1;
      }
      if (i < minesweeperBoard.length - 1 && j > 0 && minesweeperBoard[i + 1][j - 1] === 1) {
        bomb += 1;
      }
      if (i > 0 && j < minesweeperBoard[i].length - 1 && minesweeperBoard[i - 1][j + 1] === 1) {
        bomb += 1;
      }

      // Display bomb count
      if (bomb > 0) {
        tile.innerText = `${bomb}`;
      } else {
        tile.innerText = "  ";
      }
    }

    divBoard.appendChild(tile);
  }
}

divBoard.style.gridTemplateRows = 'repeat(' + rows + ', 80px)';
divBoard.style.gridTemplateColumns = 'repeat(' + cols + ', 80px)';