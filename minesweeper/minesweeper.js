// add a "difficulty" (amount of rows and cols), maybe? 
// add a condition where, when you click a mine, it goes red AND all of the other mines reveal themselves (but in black)

divBoard = document.getElementById('board');

let rows = 8;
let cols = 8;

let minesweeperBoard = [
    [0, 0, 1, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1]
];

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let tile = document.createElement('div');
    tile.classList.add('tile');
    
    tile.innerText = "  ";
    tile.style.backgroundColor = '#cccccc';
    tile.style.borderColor = '#eeeeee #999999 #999999 #eeeeee';

    let bomb = checkForMines(i, j, minesweeperBoard);

    if (minesweeperBoard[i][j] === 1) {
      tile.classList.add('mine');
      tile.innerHTML = " ";
      tile.style.backgroundColor = '#cccccc';
      tile.style.borderColor = '#eeeeee #999999 #999999 #eeeeee';
      tile.addEventListener('click', () => {
        revealAllMines();
        tile.innerHTML= "&#x2600";
        tile.style.color = "#ff0000";
        tile.style.backgroundColor = '#bbbbbb';
        tile.style.borderColor = '#999999';
      });
    } else {
        displayBombCount(tile, bomb);
    }

    divBoard.appendChild(tile);
  }
}

function checkForMines(i, j, minesweeperBoard) {
    let bomb = 0;

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

    return bomb;
}

function displayBombCount(tile, bomb) {
      if (bomb > 0) {
        if (bomb === 1) {
          tile.addEventListener('click', () => {
            tile.innerText = `${bomb}`;
            tile.style.color = '#3333cc';  
            tile.style.backgroundColor = '#bbbbbb';
            tile.style.borderColor = '#999999';
          }); 
        } else if (bomb === 2) {
            tile.addEventListener('click', () => {
                tile.innerText = `${bomb}`;
                tile.style.color = '#006600';
                tile.style.backgroundColor = '#bbbbbb';
                tile.style.borderColor = '#999999';  
            });
        } else if (bomb === 3) {
            tile.addEventListener('click', () => {
                tile.innerText = `${bomb}`;
                tile.style.color = '#cc0000';
                tile.style.backgroundColor = '#bbbbbb';
                tile.style.borderColor = '#999999';  
            });
        } else if (bomb === 4) {
            tile.addEventListener('click', () => {
                tile.innerText = `${bomb}`;
                tile.style.color = '#660066';
                tile.style.backgroundColor = '#bbbbbb';
                tile.style.borderColor = '#999999';  
            });
        } else if (bomb === 5) {
            tile.addEventListener('click', () => {
                tile.innerText = `${bomb}`;
                tile.style.color = '#006666';
                tile.style.backgroundColor = '#bbbbbb';
                tile.style.borderColor = '#999999';  
            });
        } else {
            tile.innerText = `${bomb}`;
            tile.style.backgroundColor = '#bbbbbb';
            tile.style.borderColor = '#999999';
        }
      } else {
            tile.addEventListener('click', () => {
                tile.innerText = "  ";
                tile.style.backgroundColor = '#bbbbbb';
                tile.style.borderColor = '#999999';
        });
      }
}


// work in progress!
function revealAllMines() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let tile = document.getElementsByClassName('tile')[i * cols + j];
      if (minesweeperBoard[i][j] === 1) {
        tile.innerHTML = "&#x2600";
        tile.style.color = "black";
        tile.style.backgroundColor = '#bbbbbb';
        tile.style.borderColor = '#999999';
      }
    }
  }
}


divBoard.style.gridTemplateRows = 'repeat(' + rows + ', 50px)';
divBoard.style.gridTemplateColumns = 'repeat(' + cols + ', 50px)';


/*

VALUES FOR UNKNOWN TILE:

tile.innerText = "  ";
tile.style.backgroundColor = '#cccccc';
tile.style.borderColor = '#eeeeee #999999 #999999 #eeeeee';


*/
