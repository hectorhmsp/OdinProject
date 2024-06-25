/*

    Create a Gameboard class/factory.
    Note that we have not yet created any User Interface. We should know our code is coming together by running the tests.
        You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.
    Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
    Gameboards should have a receiveAttack function that takes a pair of coordinates, 
        determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship,
        or records the coordinates of the missed shot.
    Gameboards should keep track of missed attacks so they can display them properly.
    Gameboards should be able to report whether or not all of their ships have been sunk.

    Ships: 5, 4, 3, 3, 2

*/
const board = document.getElementById('board');
const isHorizontalButton = document.getElementById('horizontal-button');

let gameBoardArray = [];
let shipLengths = [5, 4, 3, 3, 2]; 
let currentShipIndex = 0;
let rows = 10;
let cols = 10;
let isHorizontal = true;

isHorizontalButton.addEventListener('click', () => {
    isHorizontal = !isHorizontal;
})

function Ship(length) {
    let hits = 0;

    function hit() {
        if (hits < length) {
            hits++;
        }
    }

    function isSunk () {
        return hits >= length; 
    }

    return {
        length: length,
        get hits() {
            return hits; 
        },
        hit: hit, 
        isSunk: isSunk
    }
}

function createGameboard() {
    board.style.gridTemplateRows = 'repeat(' + rows + ', 50px)';
    board.style.gridTemplateColumns = 'repeat(' + cols + ', 50px)';
    
    for (let i = 0; i < rows; i++) {
        gameBoardArray[i] = [];
        for (let j = 0; j < cols; j++) {
            gameBoardArray[i][j] = null;
        }
    }

    console.log(gameBoardArray);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');

            // Generate tile ID
            let tileId = `row${i}-col${j}`;
            tile.id = tileId;

            tile.addEventListener('click', () => {
                placeShip(i,j);
            });

            tile.addEventListener('mouseover', function() {
                if (!tile.classList.contains('clicked')) {
                    tile.style.backgroundColor = 'lightblue';  
                }
            });
            
            tile.addEventListener('mouseout', function() {
                if (!tile.classList.contains('clicked')) {
                    tile.style.backgroundColor = '';
                }
            });

            board.appendChild(tile);
        }
    }
}

function placeShip(i, j) {
    let shipLength = shipLengths[currentShipIndex];

    const incrementRow = isHorizontal ? 0 : 1;
    const incrementCol = isHorizontal ? 1 : 0;

    // Verifica se o navio cabe na posição desejada
    if ((isHorizontal && j + shipLength > cols) || (!isHorizontal && i + shipLength > rows)) {
        alert('Navio não cabe. Tente outra posição!');
        return;
    }

    for (let k = 0; k < shipLength; k++) {
        const row = i + k * incrementRow; //
        const col = j + k * incrementCol;
        gameBoardArray[row][col] = 'S';
        let thisTile = document.getElementById(`row${row}-col${col}`)
        thisTile.classList.add('clicked');
        thisTile.style.backgroundColor = 'lightblue';
    }
    currentShipIndex++;


    if (currentShipIndex >= shipLengths.length) {
        alert('Todos os navios já posicionados!');
    }

}

createGameboard();
