// add a "first-click" to reveal some area; 
// add a condition to not have more than 5 mine surrounding a square, maybe? like, the numbers should go from 1 to 5 only...right?;
// add a "counter" to let the player knows how many mines there are in the board;
// add the option to click with the RMB to create a flag, a question mark and to remove the flag/question mark;
// add the flag to the "counter", like, if a player flags 5 spots, let the counter = counter - 5 (if it were 10: "5 bombs remaining");


divBoard = document.getElementById('board');
restartButton = document.getElementById('restart');


let rows = 8;
let cols = 8;
let numberOfMines;
let mineFound = 0;
let gameOver = false;

// (cols x rows) = ? mines
// 8x8 = 10 mines   (easy)
// 16x16 = 40 mines (medium)
// 30x16 = 99 mines (hard)


function playGame() {

    totalMines();

    function getRandomIndex() {
        return Math.floor(Math.random() * (rows * cols));
    }

    function getRandomMineSpots() {
        let mineSpotsSet = new Set();

        while (mineSpotsSet.size < numberOfMines) {
            mineSpotsSet.add(getRandomIndex());
        }

        return Array.from(mineSpotsSet);
    }


    let mineSpotsArray = getRandomMineSpots();

    function createMinesweeperBoard(rows, cols) {
        let flatBoardArray = Array(rows * cols).fill(0);

        for (let i = 0; i < mineSpotsArray.length; i++) {
            flatBoardArray[mineSpotsArray[i]] = 1;
        }

        let minesweeperBoard = [];

        for (let i = 0; i < rows; i++) {
            let row = flatBoardArray.slice(i * cols, (i + 1) * cols);
            minesweeperBoard.push(row);
        }

        return minesweeperBoard;
    }

    let minesweeperBoard = createMinesweeperBoard(rows, cols);

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
                if (!gameOver) {
                    revealAllMines(tile);
                    gameOver = true; 
                }
                
                if (mineFound === 0) {
                    tile.classList.remove('mine');
                    tile.classList.add('mine-found');
                    tile.innerHTML= "&#x2600";
                    tile.style.color = "#ff0000";
                    tile.style.backgroundColor = '#bbbbbb';
                    tile.style.borderColor = '#999999';
                    mineFound++;
                } else {
                    return;
                }

          });
        } else {
            displayBombCount(tile, bomb);
        }

        divBoard.appendChild(tile);
      }
    }  
}


function totalMines () {
    if (cols === 8) {
        numberOfMines = 10;
    } else if (cols === 16) {
        numberOfMines = 40;
    } else {
        numberOfMines = 99;
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
            if (!gameOver){
                tile.innerText = `${bomb}`;
                tile.style.color = '#3333cc';  
                tile.style.backgroundColor = '#bbbbbb';
                tile.style.borderColor = '#999999';
            }
          }); 
        } else if (bomb === 2) {
            tile.addEventListener('click', () => {
                if (!gameOver){
                    tile.innerText = `${bomb}`;
                    tile.style.color = '#006600';
                    tile.style.backgroundColor = '#bbbbbb';
                    tile.style.borderColor = '#999999';  
                }
            });
        } else if (bomb === 3) {
            tile.addEventListener('click', () => {
                if (!gameOver){
                    tile.innerText = `${bomb}`;
                    tile.style.color = '#cc0000';
                    tile.style.backgroundColor = '#bbbbbb';
                    tile.style.borderColor = '#999999';  
                }
            });
        } else if (bomb === 4) {
            tile.addEventListener('click', () => {
                if (!gameOver){
                    tile.innerText = `${bomb}`;
                    tile.style.color = '#660066';
                    tile.style.backgroundColor = '#bbbbbb';
                    tile.style.borderColor = '#999999';  
                }
            });
        } else if (bomb === 5) {
            tile.addEventListener('click', () => {
                if (!gameOver){
                    tile.innerText = `${bomb}`;
                    tile.style.color = '#006666';
                    tile.style.backgroundColor = '#bbbbbb';
                    tile.style.borderColor = '#999999'; 
                }
            });
        } else {
            if (!gameOver){
                tile.innerText = `${bomb}`;
                tile.style.backgroundColor = '#bbbbbb';
                tile.style.borderColor = '#999999';
            }
        }
      } else {
            tile.addEventListener('click', () => {
                if (!gameOver){
                    tile.innerText = "  ";
                    tile.style.backgroundColor = '#bbbbbb';
                    tile.style.borderColor = '#999999';
                }
             });
      }
    
}

function revealAllMines() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let tile = document.getElementsByClassName('tile')[i * cols + j];
      if (tile.classList.contains('mine')) {
        tile.innerHTML = "&#x2600";
        tile.style.color = "black";
        tile.style.backgroundColor = '#bbbbbb';
        tile.style.borderColor = '#999999';
      }
    }
  }
}

function restartGame () {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let tiles = Array.from(document.getElementsByClassName('tile'));
          tiles.forEach(tile => {
            divBoard.removeChild(tile);
          });
        }
    }
    mineFound = 0;
    gameOver = false;
    playGame();
}


divBoard.style.gridTemplateRows = 'repeat(' + rows + ', 50px)';
divBoard.style.gridTemplateColumns = 'repeat(' + cols + ', 50px)';
restartButton.addEventListener('click', restartGame);

playGame();


/*
            tile.addEventListener('contextmenu', function(event) {
                event.preventDefault(); 
    
                if (event.button === 2) {
                    tile.innerText = '!';
                    tile.style.color = 'red';
                }
            });

*/
