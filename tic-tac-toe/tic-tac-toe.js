const gameBoardDiv = document.querySelector('.js-gameboard');
const tileDiv = document.querySelector('.js-tile');
const gameBoard = [];


//Your main goal here is to have as little global code as possible. 
//Try tucking everything away inside of a module or factory.
//   >If you only ever need ONE of something (gameBoard, displayController), use a module.
//   >If you need multiples of something (players!), create them with factories.


const Player = function (name) {
	this.name = name;
}
