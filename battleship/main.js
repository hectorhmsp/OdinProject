//------------------------------
// ----------- TASKS -----------
//------------------------------
// 
// 3) colocar para que, no próximo turno do PC, se ele acertou um navio, continue atacando de forma "lógica";
// 4) alterar os estilos (background, imagens, etc.)
// 5) ajustar para que, quando eu ataque e acerte um navio, fique vermelho-escuro com um X, e quando errar, ficar azul

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal and reload the page
span.onclick = function() {
    modal.style.display = "none";
    location.reload(); // Reinicia a página
}
  
// When the user clicks anywhere outside of the modal, close it and reload the page
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        location.reload(); // Reinicia a página
    }
}

// Variáveis de controle do ataque
let foundShip = false;
let hitCoordinates = null;
let initialHitCoordinates = null; // Para armazenar a coordenada do primeiro acerto
let currentDirection = null;
let previousDirection = null; // Para armazenar a direção anterior
let lastAttack = null;
let attackedCoordinates = new Set();
let targetDirections = shuffleArray(['up', 'down', 'left', 'right']); // Direções embaralhadas

// Main function for computer attack
function computerAttack() {
    const boardSize = 10; // Define the size of the board here
    let x, y;

    // Loop until a valid attack is found
    while (true) {
        // If no ship is found, attack randomly
        if (!foundShip) {
            ({ x, y } = getRandomCoordinates());

            // If valid and not already attacked coordinates
            if (!attackedCoordinates.has(`${x},${y}`)) {
                let hit = playerTurn(x, y); // Check if hit
                console.log('ESSE É O HIT: ', hit);

                if (hit) {
                    foundShip = true;
                    hitCoordinates = { x, y };
                    initialHitCoordinates = { x, y }; // Store the first hit
                    currentDirection = targetDirections.pop(); // Choose a random direction
                }

                // Update the attacked tile style
                updateAttackedTileStyle(x, y, hit, 'board0');

                // Update last attack coordinates
                lastAttack = { x, y };
                attackedCoordinates.add(`${x},${y}`);
                
                // Return the attack coordinates
                return { x, y };
            }
        } else {
            // If a ship was found, continue attacking
            let coords = attackInCurrentDirection();

            // Check if coords is not null before proceeding
            if (coords && !attackedCoordinates.has(`${coords.x},${coords.y}`)) {
                let hit = playerTurn(coords.x, coords.y);
                updateAttackedTileStyle(coords.x, coords.y, hit, 'board0');
                lastAttack = { x: coords.x, y: coords.y };
                attackedCoordinates.add(`${coords.x},${coords.y}`);

                if (!hit) {
                    // Change direction or reset if it fails
                    handleMissedAttack();
                } else {
                    hitCoordinates = coords; // Update to the last hit
                }

                // Return the attack coordinates
                return coords;
            } else {
                // If the generated coordinates are invalid, reset or change direction
                handleMissedAttack();
            }
        }
    }
}

// Função para atualizar o estilo do tile atacado
function updateAttackedTileStyle(x, y, hit, boardId) {
    let attackedTile = document.getElementById(`row-${x}-col-${y}-${boardId}`);
    if (attackedTile) {
        if (hit) {
            attackedTile.style.backgroundColor = 'darkred'; // Caso de acerto
            attackedTile.innerText = 'X'; // Marca acerto com "X"
        } else {
            attackedTile.style.backgroundColor = 'blue'; // Caso de erro
        }
    }
}

// Função para gerar coordenadas aleatórias não atacadas
function getRandomCoordinates() {
    let x = Math.floor(Math.random() * 10); // Tamanho do tabuleiro
    let y = Math.floor(Math.random() * 10);
    return { x, y };
}

// Função para atacar na direção atual ou escolher uma nova direção se necessário
function attackInCurrentDirection() {
    if (!currentDirection) return null;

    let nextCoords = getNextCoordinates(hitCoordinates, currentDirection);

    // Verifica se a nova coordenada é válida e ainda não foi atacada
    if (nextCoords && !attackedCoordinates.has(`${nextCoords.x},${nextCoords.y}`)) {
        return nextCoords;
    }

    // Caso não encontre uma coordenada válida, retorna null
    return null;
}

// Função para lidar com ataques perdidos
function handleMissedAttack(reset = false) {
    if (reset || targetDirections.length === 0) {
        // Redefine se não houver direções disponíveis
        foundShip = false;
        initialHitCoordinates = null;
        currentDirection = null;
        targetDirections = shuffleArray(['up', 'down', 'left', 'right']); // Reembaralha as direções
    } else {
        // Tenta a próxima direção disponível
        previousDirection = currentDirection;
        currentDirection = targetDirections.pop();
    }
}

// Função para obter a próxima coordenada baseada na direção atual
function getNextCoordinates(coords, direction) {
    if (!coords) return null;
    let { x, y } = coords;

    switch (direction) {
        case 'up':
            x -= 1;
            break;
        case 'down':
            x += 1;
            break;
        case 'left':
            y -= 1;
            break;
        case 'right':
            y += 1;
            break;
        default:
            return null;
    }

    // Verifica se as coordenadas estão dentro dos limites do tabuleiro
    if (x >= 0 && x < 10 && y >= 0 && y < 10) {
        return { x, y };
    }

    return null; // Se estiver fora dos limites, retorna null
}

// Função para embaralhar um array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const rows = 10;
const cols = 10;
const boards = document.getElementById('boards');
const horizontalButton = document.getElementById('horizontal-button');
let boardNum = 0; 
let shipArray = [5,4,3,3,2] // array do tamanho dos navios
let isHorizontal = true;
let gameover = false;
let playerModal = document.querySelector(".player-modal");

horizontalButton.addEventListener('click', () => {
    isHorizontal = !isHorizontal;
    if (isHorizontal) {
        horizontalButton.innerHTML = "Horizontal";
    } else {
        horizontalButton.innerHTML = "Vertical";
    }
});

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
    board.style.display = 'grid';
    board.style.gridTemplateRows = `repeat(${rows}, 50px)`;
    board.style.gridTemplateColumns = `repeat(${cols}, 50px)`;

    // criação da matriz gameBoardArray
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
            if (board.id === 'board-0') { tile.id = `row-${i}-col-${j}-board0`; } else { tile.id = `row-${i}-col-${j}-board1`;}

            tile.dataset.x = i; // coloca um dataset
            tile.dataset.y = j;
            
            if (board.id === 'board-0') {

                tile.addEventListener('mouseover', function() {
                    let x = parseInt(this.dataset.x); // recupera o dataset 
                    let y = parseInt(this.dataset.y);
                    let shipLength = shipArray[0]; // usa o primeiro navio do array de tamanhos
                
                    for (let k = 0; k < shipLength; k++) {
                        let currentTile;
                        
                        if (isHorizontal === true) {
                            if (y + shipLength > cols) {
                                currentTile = null; // Para evitar acesso fora dos limites
                            } else {
                                currentTile = document.getElementById(`row-${x}-col-${y + k}-board0`);
                            }
                        } else {
                            if (x + shipLength > rows) {
                                currentTile = null; // Para evitar acesso fora dos limites
                            } else {
                                currentTile = document.getElementById(`row-${x + k}-col-${y}-board0`);
                            }
                        }
                
                        if (currentTile !== null && currentTile.style.backgroundColor !== 'red') {
                            currentTile.style.backgroundColor = 'grey';
                        }
                    }
                });
                
                tile.addEventListener('mouseout', function() {
                    let x = parseInt(this.dataset.x); // recupera o dataset 
                    let y = parseInt(this.dataset.y);
                    let shipLength = shipArray[0]; // usa o primeiro navio do array de tamanhos
                
                    for (let k = 0; k < shipLength; k++) {
                        let currentTile;
                
                        if (isHorizontal === true) {
                            if (y + shipLength > cols) {
                                currentTile = null; // Para evitar acesso fora dos limites
                            } else {
                                currentTile = document.getElementById(`row-${x}-col-${y + k}-board0`);
                            }
                        } else {
                            if (x + shipLength > rows) {
                                currentTile = null; // Para evitar acesso fora dos limites
                            } else {
                                currentTile = document.getElementById(`row-${x + k}-col-${y}-board0`);
                            }
                        }
                
                        if (currentTile !== null && currentTile.style.backgroundColor !== 'red') {
                            currentTile.style.backgroundColor = '';
                        }
                    }
                });

                tile.addEventListener('click', function() {
                    if (gameover === false) {
                        let x = parseInt(this.dataset.x);
                        let y = parseInt(this.dataset.y);
                        let shipLength = shipArray[0]; 
                        if (player1.ownGameBoard.placeShip(x, y, shipLength, isHorizontal, 'board0')) { // executa a função placeShip e retorna 'true' se deu certo
                            shipArray.shift(); // remove o navio do array de tamanhos após colocá-lo
                            console.log(`Restam tais navios: ${shipArray}`);
                        }
                    }
                });

            } else {
                tile.addEventListener('mouseover', () => {
                    if (tile.style.backgroundColor === 'darkred') { return } else { tile.style.backgroundColor = 'darkblue'; } 
                });

                tile.addEventListener('mouseout', () => {
                    if (tile.style.backgroundColor === 'darkred') { return } else { tile.style.backgroundColor = ''; }
                });

                tile.addEventListener('click', () => {
                    if (gameover === false) {
                        let x = parseInt(event.target.dataset.x); 
                        let y = parseInt(event.target.dataset.y); 
                        let currentTile = document.getElementById(`row-${x}-col-${y}-board1`);
                
                        // Verifica se a célula já foi atacada para evitar ataques repetidos
                        if (currentTile.style.backgroundColor === 'darkred') {
                            console.log("Posição já atacada!");
                            return;
                        }
                
                        // Atualiza o estilo do tile atacado
                        currentTile.style.backgroundColor = 'darkred';
                        playerTurn(x, y);
                
                        if (currentPlayer === player2 && !gameover) {
                            let coords = computerAttack(); // Chama a função de ataque do computador
                            
                            // Atualiza o estilo do tile atacado pelo computador no board do jogador 1
                            let attackedTile = document.getElementById(`row-${coords.x}-col-${coords.y}-board0`);
                            if (attackedTile) {
                                attackedTile.innerText = 'X'; // Marca o ataque
                            }
                        }
                    }
                });
                
            } 

            board.appendChild(tile);
        }
    }

    function placeShip(x, y, length, isHorizontal, board) {
        let newShip = Ship(length);
        ships.push(newShip);
    
        if (isHorizontal) {
            if (y + length > cols) {
                console.log("Não é possível colocar o navio nesta posição horizontalmente.");
                return false;
            }
    
            for (let i = 0; i < length; i++) {
                let xi = x;
                let yi = y + i; // o "yi" é atualizado em cada loop
    
                if ( // verifica se há alguma navio nos quadrados adjacentes ao local desejado
                    gameBoardArray[xi][yi].hasShip ||
                    (xi > 0 && yi > 0 && gameBoardArray[xi - 1][yi - 1].hasShip) ||
                    (xi > 0 && gameBoardArray[xi - 1][yi].hasShip) ||
                    (xi > 0 && yi < cols - 1 && gameBoardArray[xi - 1][yi + 1].hasShip) ||
                    (yi > 0 && gameBoardArray[xi][yi - 1].hasShip) ||
                    (yi < cols - 1 && gameBoardArray[xi][yi + 1].hasShip) ||
                    (xi < rows - 1 && yi > 0 && gameBoardArray[xi + 1][yi - 1].hasShip) ||
                    (xi < rows - 1 && gameBoardArray[xi + 1][yi].hasShip) ||
                    (xi < rows - 1 && yi < cols - 1 && gameBoardArray[xi + 1][yi + 1].hasShip)
                ) {
                    console.log("Há um navio bloqueando esta posição.");
                    return false;
                }
            }
    
            for (let i = 0; i < length; i++) {
                gameBoardArray[x][y + i].hasShip = true;
                gameBoardArray[x][y + i].ship = newShip;
                if (board === 'board0') {
                    let currentShipPlaced = document.getElementById(`row-${x}-col-${y+i}-board0`);
                    currentShipPlaced.style.backgroundColor = 'red';
                }
            }
        } else {
            if (x + length > rows) {
                console.log("Não é possível colocar o navio nesta posição verticalmente.");
                return false;
            }
    
            for (let i = 0; i < length; i++) {
                let xi = x + i;
                let yi = y;
    
                if (
                    gameBoardArray[xi][yi].hasShip ||
                    (xi > 0 && yi > 0 && gameBoardArray[xi - 1][yi - 1].hasShip) ||
                    (xi > 0 && gameBoardArray[xi - 1][yi].hasShip) ||
                    (xi > 0 && yi < cols - 1 && gameBoardArray[xi - 1][yi + 1].hasShip) ||
                    (yi > 0 && gameBoardArray[xi][yi - 1].hasShip) ||
                    (yi < cols - 1 && gameBoardArray[xi][yi + 1].hasShip) ||
                    (xi < rows - 1 && yi > 0 && gameBoardArray[xi + 1][yi - 1].hasShip) ||
                    (xi < rows - 1 && gameBoardArray[xi + 1][yi].hasShip) ||
                    (xi < rows - 1 && yi < cols - 1 && gameBoardArray[xi + 1][yi + 1].hasShip)
                ) {
                    console.log("Há um navio bloqueando esta posição.");
                    return false;
                }
            }
    
            for (let i = 0; i < length; i++) {
                gameBoardArray[x + i][y].hasShip = true;
                gameBoardArray[x + i][y].ship = newShip;
                if (board === 'board0') {
                    let currentShipPlaced = document.getElementById(`row-${x+i}-col-${y}-board0`);
                    currentShipPlaced.style.backgroundColor = 'red';
                }
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

function Player(name, ownGameBoard, opponentGameBoard) {
    this.name = name;
    this.ownGameBoard = ownGameBoard;
    this.opponentGameBoard = opponentGameBoard;

    this.makeMove = function(x, y) {
        const attackResult = this.opponentGameBoard.receiveAttack(x, y);
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

    player1 = new Player('Player 1', gameBoard1, gameBoard2);
    player2 = new Player('Player 2', gameBoard2, gameBoard1);

    console.log("Posicione seus navios Player 1:");
    console.log("Posicione seus navios Player 2:");
    
    player2.ownGameBoard.placeShip(0, 0, 5, true, 'board1');
    player2.ownGameBoard.placeShip(2, 0, 4, true, 'board1');
    player2.ownGameBoard.placeShip(4, 0, 3, true, 'board1');
    player2.ownGameBoard.placeShip(6, 0, 3, true, 'board1');
    player2.ownGameBoard.placeShip(8, 0, 2, true, 'board1');
    

    currentPlayer = player1;
    console.log(`Agora é a vez do ${currentPlayer.name}. Use o comando playerTurn(x, y) para atacar.`);
}

// Exemplo de como fazer um ataque por turno
function playerTurn(x, y) {
    let hit = false; // Variável para indicar se foi um acerto

    // Verifica se a jogada é válida e executa a ação de ataque
    if (currentPlayer.makeMove(x, y)) {
        // Checa se o tile atacado tinha um navio (depende da implementação de makeMove)
        hit = currentPlayer === player1 
            ? gameBoard2.gameBoardArray[x][y].hasShip // Assumindo que `isHit` marca acerto
            : gameBoard1.gameBoardArray[x][y].hasShip;

        // Verifica se todos os navios foram afundados para determinar o fim do jogo
        if (gameBoard1.allSunk()) {
            modal.style.display = "block";
            playerModal.innerText = "Player 2 Won!";
            gameover = true;
        } else if (gameBoard2.allSunk()) {
            modal.style.display = "block";
            playerModal.innerText = "Player 1 Won!";
            gameover = true;
        } else {
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            console.log(`Agora é a vez do ${currentPlayer.name}. Use o comando playerTurn(x, y) para atacar.`);
        }
    } else {
        console.log('Tente novamente.');
    }

    // Retorna o resultado do ataque
    return hit;
}


function getShipCoordinates(gameBoardArray) {
    let shipCoordinates = {};
    
    for (let i = 0; i < gameBoardArray.length; i++) {
        for (let j = 0; j < gameBoardArray[i].length; j++) {
            if (gameBoardArray[i][j].hasShip) {
                let ship = gameBoardArray[i][j].ship;
                let shipLength = ship.length;
                
                if (!shipCoordinates[shipLength]) {
                    shipCoordinates[shipLength] = [];
                }
                
                shipCoordinates[shipLength].push(`(${i}, ${j})`);
            }
        }
    }

    let formattedOutput = '';
    for (let length in shipCoordinates) {
        formattedOutput += `Navio tamanho ${length}: ${shipCoordinates[length].join(', ')}\n`;
    }
    
    return formattedOutput;
}


playGame();