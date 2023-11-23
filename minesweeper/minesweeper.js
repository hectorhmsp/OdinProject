// ** TASKS ** //
//
// add a condition to not have more than 5 mine surrounding a square, maybe? like, the numbers should go from 1 to 5 only...right?;
// add a button for the player to choose the difficulty (easy, intermediate, hard);
// add classes to the mines, numbered-squares, etc. for better readability;
// add a "victory" condition (when the player clicked all of the squares without bombs or something);



divBoard = document.getElementById('board');
easyButton = document.getElementById('easy');
mediumButton = document.getElementById('medium');
hardButton = document.getElementById('hard');
counterDiv = document.getElementById('counter');
counterDiv.classList.add('counter');

let rows;
let cols;
let numberOfMines;
let counter; 
let mineFound = 0;
let gameOver = false;
let flag = false;
let revealed = false;

easyButton.addEventListener('click', () => {
    rows = 8;
    cols = 8;
    restartGame();
    playGame();
});

mediumButton.addEventListener('click', () => {
    rows = 16;
    cols = 16;
    restartGame();
    playGame();
});

hardButton.addEventListener('click', () => {
    rows = 16;
    cols = 30;
    restartGame();
    playGame();
});




// (cols x rows) = ? mines
// 8x8 = 10 mines   (easy)
// 16x16 = 40 mines (medium)
// 30x16 = 99 mines (hard)


function playGame() {

    const baseTileSize = cols === 8 ? 50 : (cols === 16 ? 27 : 27);

    document.documentElement.style.setProperty('--base-tile-size', `${baseTileSize}px`);

    if (cols === 8) {
        divBoard.style.gridTemplateRows = 'repeat(' + rows + ', 50px)';
        divBoard.style.gridTemplateColumns = 'repeat(' + cols + ', 50px)';
    } else if (cols === 16) {
        divBoard.style.gridTemplateRows = 'repeat(' + rows + ', 27px)';
        divBoard.style.gridTemplateColumns = 'repeat(' + cols + ', 27px)';
    } else {
        divBoard.style.gridTemplateRows = 'repeat(' + rows + ', 27px)';
        divBoard.style.gridTemplateColumns = 'repeat(' + cols + ', 27px)';
    }

    totalMines();

    counter = numberOfMines;
    counterDiv.innerHTML = `Mines left: ${counter}`;

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
            tile.flag = false;
            tile.revealed = false;


            // Generate tile ID
            let tileId = `row${i}-col${j}`;
            tile.id = tileId;
            

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
                    displayBombCount(tile, bomb, flag, i, j, minesweeperBoard);           
            }



            tile.addEventListener('contextmenu', function(event) {
                event.preventDefault();

                if (event.button === 2 && !gameOver && !tile.revealed) {
                    if (!tile.flag) {
                        tile.innerText = '!';
                        tile.style.color = 'red';
                        tile.flag = true;
                        counter--; 
                        counterDiv.innerHTML = `Mines left: ${counter}`;
                    } else if (tile.flag) {
                        if (tile.innerText === "?") {
                            tile.innerText = " ";
                            tile.flag = false;
                        } else {
                            tile.innerText = "?";
                            counter++; 
                            counterDiv.innerHTML = `Mines left: ${counter}`;
                        }    
                    }
                }
            });

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

function displayBombCount(tile, bomb, flag, i, j, minesweeperBoard) {
        if (bomb > 0) {
            if (bomb === 1) {
                tile.addEventListener('click', () => {
                    if (!gameOver && !tile.revealed) {

                        if (tile.innerText !== '?' && tile.flag && !tile.revealed) {
                            counter++;
                            counterDiv.innerHTML = `Mines left: ${counter}`;     
                        }

                        tile.revealed = true;
                        tile.innerText = `${bomb}`;
                        tile.style.color = '#3333cc';  
                        tile.style.backgroundColor = '#bbbbbb';
                        tile.style.borderColor = '#999999';


                    }
                }); 
            } else if (bomb === 2) {
                tile.addEventListener('click', () => {
                    if (!gameOver && !tile.revealed){

                        if (tile.innerText !== '?' && tile.flag && !tile.revealed) {
                            counter++;
                            counterDiv.innerHTML = `Mines left: ${counter}`;     
                        }

                        tile.revealed = true;
                        tile.innerText = `${bomb}`;
                        tile.style.color = '#006600';
                        tile.style.backgroundColor = '#bbbbbb';
                        tile.style.borderColor = '#999999';  
                    }
                });
            } else if (bomb === 3) {
                tile.addEventListener('click', () => {
                    if (!gameOver && !tile.revealed){

                        if (tile.innerText !== '?' && tile.flag && !tile.revealed) {
                            counter++;
                            counterDiv.innerHTML = `Mines left: ${counter}`;     
                        }

                        tile.revealed = true;
                        tile.innerText = `${bomb}`;
                        tile.style.color = '#cc0000';
                        tile.style.backgroundColor = '#bbbbbb';
                        tile.style.borderColor = '#999999';  
                    }
                });
            } else if (bomb === 4) {
                tile.addEventListener('click', () => {
                    if (!gameOver && !tile.revealed){

                        if (tile.innerText !== '?' && tile.flag && !tile.revealed) {
                            counter++;
                            counterDiv.innerHTML = `Mines left: ${counter}`;     
                        }

                        tile.revealed = true;
                        tile.innerText = `${bomb}`;
                        tile.style.color = '#660066';
                        tile.style.backgroundColor = '#bbbbbb';
                        tile.style.borderColor = '#999999';  
                    }
                });
            } else if (bomb === 5) {
                tile.addEventListener('click', () => {
                    if (!gameOver && !tile.revealed){

                        if (tile.innerText !== '?' && tile.flag && !tile.revealed) {
                            counter++;
                            counterDiv.innerHTML = `Mines left: ${counter}`;     
                        }

                        tile.revealed = true;
                        tile.innerText = `${bomb}`;
                        tile.style.color = '#006666';
                        tile.style.backgroundColor = '#bbbbbb';
                        tile.style.borderColor = '#999999'; 
                    }
                });
            } else {
                if (!gameOver && !tile.revealed){

                    if (tile.innerText !== '?' && tile.flag && !tile.revealed) {
                        counter++;
                        counterDiv.innerHTML = `Mines left: ${counter}`;     
                    }

                    tile.revealed = true;
                    tile.innerText = `${bomb}`;
                    tile.style.backgroundColor = '#bbbbbb';
                    tile.style.borderColor = '#999999';
                }
            }
        } else {
            tile.addEventListener('click', () => {
                if (!gameOver) {

                    revealAdjacentEmptyTilesThrottled(i, j, minesweeperBoard);

                    if (tile.innerText !== '?' && tile.flag && !tile.revealed) {
                        counter++;
                        counterDiv.innerHTML = `Mines left: ${counter}`;     
                    }

                    tile.revealed = true;
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

function revealAdjacentEmptyTilesThrottled(i, j, minesweeperBoard) {
    const directions = [
        { row: 0, col: -1 }, // Left
        { row: 0, col: 1 },  // Right
        { row: -1, col: 0 }, // Up
        { row: 1, col: 0 },  // Down
        { row: -1, col: -1 },// Up Left
        { row: -1, col: 1 }, // Up Right
        { row: 1, col: -1 }, // Down Left
        { row: 1, col: 1 },  // Down Right
    ];

    const throttleDelay = 500; // Adjust the delay as needed

    let lastCallTime = 0;

    const throttledFunction = () => {
        const currentTime = new Date().getTime();

        if (currentTime - lastCallTime >= throttleDelay) {
            for (const dir of directions) {
                const newRow = i + dir.row;
                const newCol = j + dir.col;

                if (
                    newRow >= 0 && newRow < minesweeperBoard.length &&
                    newCol >= 0 && newCol < minesweeperBoard[newRow].length &&
                    minesweeperBoard[newRow][newCol] === 0
                ) {
                    document.getElementById(`row${newRow}-col${newCol}`).click();
                }
            }

            lastCallTime = currentTime;
        }
    };

    throttledFunction();
}

function restartGame() {
    const tiles = Array.from(document.getElementsByClassName('tile'));
    tiles.forEach(tile => {
        divBoard.removeChild(tile);
    });

    mineFound = 0;
    gameOver = false;
}




