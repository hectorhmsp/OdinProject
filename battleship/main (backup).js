const rows = 10;
const cols = 10;
const boards = document.getElementById('boards');
let boardNum = 0;

function Ship(length) {
    let hits = 0;

    function hit() {
        if (hits < length) {
            hits++;
        }
    }

    function isSunk() {
        return hits >= length;
    }

    return {
        length: length,
        get hits() {
            return hits;
        },
        hit: hit,
        isSunk: isSunk
    };
}

function createGameboard() {
    let gameBoardArray = [];
    let ships = [];
    let board = document.createElement('div');
    board.id = `board-${boardNum}`;
    board.classList.add('board');
    board.style.gridTemplateRows = 'repeat(' + rows + ', 50px';
    board.style.gridTemplateColumns = 'repeat(' + cols + ', 50px)';

    for (let i = 0; i < rows; i++) {
        gameBoardArray[i] = [];
        for (let j = 0; j < cols; j++) {
            gameBoardArray[i][j] = {
                hasShip: false,
                ship: null,
                isMissed: false,
                isHit: false
            };
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.id = `row-${i}-col-${j}`;
            board.appendChild(tile);
        }
    }

    function placeShip(x, y, length, isHorizontal) {
        let newShip = Ship(length);
        ships.push(newShip);

        if (isHorizontal) {
            if (y + length > cols) {
                console.log("Não é possível colocar o navio nesta posição horizontalmente.");
                return false;
            }
            for (let i = 0; i < length; i++) {
                if (gameBoardArray[x][y + i].hasShip) {
                    console.log("Há um navio bloqueando esta posição.");
                    return false;
                }
                gameBoardArray[x][y + i].hasShip = true;
                gameBoardArray[x][y + i].ship = newShip;
            }
        } else {
            if (x + length > rows) {
                console.log("Não é possível colocar o navio nesta posição verticalmente.");
                return false;
            }
            for (let i = 0; i < length; i++) {
                if (gameBoardArray[x + i][y].hasShip) {
                    console.log("Há um navio bloqueando esta posição.");
                    return false;
                }
                gameBoardArray[x + i][y].hasShip = true;
                gameBoardArray[x + i][y].ship = newShip;
            }
        }
        return true;
    }

    function receiveAttack(x, y) {
        if (x >= 0 && x < rows && y >= 0 && y < cols) {
            if (gameBoardArray[x][y].isHit || gameBoardArray[x][y].isMissed) {
                console.log("Posição já atacada!");
                return false;
            }
            if (gameBoardArray[x][y].hasShip) {
                gameBoardArray[x][y].isHit = true;
                gameBoardArray[x][y].ship.hit();
                if (gameBoardArray[x][y].ship.isSunk()) {
                    console.log("Navio afundado!");
                } else {
                    console.log("Navio atingido!");
                }
            } else {
                gameBoardArray[x][y].isMissed = true;
                console.log("Ataque na água!");
            }
            return true;
        } else {
            console.log("Coordenadas fora dos limites!");
            return false;
        }
    }

    function allSunk() {
        for (let ship of ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    boards.appendChild(board);
    boardNum++;

    return {
        placeShip: placeShip,
        receiveAttack: receiveAttack,
        allSunk: allSunk,
        gameBoardArray: gameBoardArray,
        ships: ships
    };
}

function Player(name, gameBoard) {
    this.name = name;
    this.gameBoard = gameBoard;

    this.makeMove = function(x, y) {
        const attackResult = this.gameBoard.receiveAttack(x, y);
        if (attackResult) {
            console.log(`Ataque bem-sucedido por ${this.name} em [${x}, ${y}]!`);
        } else {
            console.log(`Ataque falhou por ${this.name} em [${x}, ${y}].`);
        }
        return attackResult;
    };
}

let player1, player2, gameBoard1, gameBoard2, currentPlayer;

function playGame() {
    gameBoard1 = createGameboard();
    gameBoard2 = createGameboard();

    player1 = new Player('Player 1', gameBoard2);
    player2 = new Player('Player 2', gameBoard1);

    console.log("Posicione seus navios Player 1:");
    player1.gameBoard.placeShip(0, 0, 5, true);
    player1.gameBoard.placeShip(2, 2, 4, false);
    player1.gameBoard.placeShip(4, 4, 3, true);
    player1.gameBoard.placeShip(6, 6, 3, false);
    player1.gameBoard.placeShip(8, 8, 2, true);

    console.log("Posicione seus navios Player 2:");
    player2.gameBoard.placeShip(1, 1, 5, true);
    player2.gameBoard.placeShip(3, 3, 4, false);
    player2.gameBoard.placeShip(5, 5, 3, true);
    player2.gameBoard.placeShip(7, 7, 3, false);
    player2.gameBoard.placeShip(9, 8, 2, true);

    currentPlayer = player1;
    console.log(`Agora é a vez do ${currentPlayer.name}. Use o comando playerTurn(x, y) para atacar.`);
}

function playerTurn(x, y) {
    if (!gameBoard1.allSunk() && !gameBoard2.allSunk()) {
        if (currentPlayer.makeMove(x, y)) {
            if (currentPlayer === player1) {
                if (gameBoard2.allSunk()) {
                    console.log("Player 1 venceu! Todos os navios do Player 2 foram destruídos.");
                    return;
                }
                currentPlayer = player2;
            } else {
                if (gameBoard1.allSunk()) {
                    console.log("Player 2 venceu! Todos os navios do Player 1 foram destruídos.");
                    return;
                }
                currentPlayer = player1;
            }
        }
        console.log(`Agora é a vez do ${currentPlayer.name}. Use o comando playerTurn(x, y) para atacar.`);
    } else {
        if (gameBoard1.allSunk()) {
            console.log("Player 2 venceu! Todos os navios do Player 1 foram destruídos.");
        } else {
            console.log("Player 1 venceu! Todos os navios do Player 2 foram destruídos.");
        }
    }
}

playGame();
