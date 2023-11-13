divBoard = document.getElementById('board');

let rows = 3;
let cols = 3;

let minesweeperBoard = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
];

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');

        if (minesweeperBoard[i][j] === 1) {
            tile.classList.add('mine');
            tile.innerText = " * "
        }

        checkForMines(i, j, minesweeperBoard, tile);

        divBoard.appendChild(tile);
    }
}

divBoard.style.gridTemplateRows = 'repeat(' + rows + ', 30px)';
divBoard.style.gridTemplateColumns = 'repeat(' + cols + ', 30px)';


function checkForMines(i, j, minesweeperBoard, tile) {
    const numRows = minesweeperBoard.length;
    const numCols = minesweeperBoard[0].length;
    
    if (minesweeperBoard[i][0] === 0 && minesweeperBoard[i][j] !== 1) {
        if (
            (i > 0 && minesweeperBoard[i - 1][0]) ||
            (i > 0 && minesweeperBoard[i - 1][1]) ||
            (i > 0 && minesweeperBoard[i][1]) ||
            (i < numRows - 1 && minesweeperBoard[i + 1][0]) ||
            (i < numRows - 1 && minesweeperBoard[i + 1][1]) === 1
        ) {
            tile.innerText = " 1 ";
        }
    }
}
