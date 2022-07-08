const gameCell = document.querySelectorAll('.tictactoe-cell');
const modalOptions = document.querySelector('.modal-options');
const buttonStart = document.querySelector('.button-start');
const scoreInfo = document.querySelector('.info-score');
const moveTurnInfo = document.querySelector('.info-move');

var getRandomInt = (min, max) => {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

let isGame = false;
const whoseMove = getRandomInt(1, 2);

buttonStart.addEventListener('click', function() {
	
	modalOptions.classList.add('_hide');
	setTimeout(() => {
		scoreInfo.classList.toggle('_hide');
		moveTurnInfo.classList.toggle('_hide');
	}, 500);
	gameCell.forEach(element => element.classList.toggle('_hide'));
	setTimeout(() => gameLoop(whoseMove, isGame), 500);
})

function gameLoop(whoseMove, isGamel) {
	const scoreRange = document.getElementById('score-range').value;
	const infoGameLeft = document.querySelector('.game-left');
	const infoPlayerTurn = document.querySelector('.player-turn');
	
	const playerSymbol = getRandomInt(1, 2);

	const playerTypeLetter = playerSymbol == 1 ? "X" : "0";
	const botTypeLetter = playerSymbol == 1 ? "0" : "X";

	let playerTurn;
	let statusTurn;


	isGame = true;
	infoGameLeft.textContent = scoreRange;
	infoPlayerTurn.textContent = (whoseMove == 1) ? "Ваш ход" : "Ходит бот";

	logStartGame();

	if (whoseMove == 1) {
		playerMove(playerTurn);
	} else {
		botMove(playerTurn);
	}

	function playerMove(playerTurn, playerTypeLetter, botTypeLetter) {
		playerTurn = "player";

		gameCell.forEach(cell => cell.addEventListener('click', function() {
			const collectionCells = document.querySelectorAll(".tictactoe-cell:not(.active)");
			if (!cell.classList.contains('active')) {
				if (playerTurn == "player") {
					if (cell.innerHTML == "") {
						cell.textContent = playerTypeLetter;
						cell.classList.add('active');
						cell.classList.add(playerTypeLetter);
					}
					playerTurn = "bot"
				}
			}
		}));

		let checkingMap = mapChecker(playerTypeLetter, botTypeLetter);
		if (checkingMap == { isEndGame: true, whoWinner: "bot" }) {
			endGame(false, "bot");
		} else {
			endGame(false, "player");
		}
	botMove(playerTurn);
	}



	function botMove(playerTurn, playerTypeLetter, botTypeLetter) {
		playerTurn = "bot";
		const collectionCells = document.querySelectorAll(".tictactoe-cell:not(.active)");
		const turn = getRandomInt(0, collectionCells.length);
		
		collectionCells[turn].textContent = botTypeLetter;
		collectionCells[turn].classList.add('active');
		collectionCells[turn].classList.add(botTypeLetter);

		let checkingMap = mapChecker(playerTypeLetter, botTypeLetter);
		if (checkingMap == { isEndGame: true, whoWinner: "bot" }) {
			endGame(false, "bot");
		} else {
			endGame(false, "player");
		}

		playerTurn = "player";
		playerMove(playerTurn);
	}






	function endGame(isGame, winner) {
		if (isGame == false) {
			alert("Игра завершена, победил " + winner);
			location.reload();
		}
	}


	function mapChecker(playerTypeLetter, botTypeLetter) {
		const cell = document.querySelectorAll('.tictactoe-cell');
		const listCells = [];

		let isEndGame = false, whoWinner;

		for (let i = 0; i < cell.length; i++) {
			listCells.push(cell.innerHTML);
		}
		if (listCells[0] === playerTypeLetter && listCells[1] === playerTypeLetter && listCells[2] === playerTypeLetter ||
			 listCells[3] === playerTypeLetter && listCells[4] === playerTypeLetter && listCells[5] === playerTypeLetter ||
			 listCells[6] === playerTypeLetter && listCells[7] === playerTypeLetter && listCells[8] === playerTypeLetter ||
			 listCells[0] === playerTypeLetter && listCells[3] === playerTypeLetter && listCells[6] === playerTypeLetter ||
			 listCells[1] === playerTypeLetter && listCells[4] === playerTypeLetter && listCells[7] === playerTypeLetter ||
			 listCells[2] === playerTypeLetter && listCells[5] === playerTypeLetter && listCells[8] === playerTypeLetter ||
		 	 listCells[0] === playerTypeLetter && listCells[4] === playerTypeLetter && listCells[8] === playerTypeLetter ||
			 listCells[6] === playerTypeLetter && listCells[4] === playerTypeLetter && listCells[2] === playerTypeLetter) {
			isEndGame = true, whoWinner = "player";
		}
		if (listCells[0] == botTypeLetter && listCells[1] == botTypeLetter && listCells[2] == botTypeLetter ||
			 listCells[3] == botTypeLetter && listCells[4] == botTypeLetter && listCells[5] == botTypeLetter ||
			 listCells[6] == botTypeLetter && listCells[7] == botTypeLetter && listCells[8] == botTypeLetter ||
			 listCells[0] == botTypeLetter && listCells[3] == botTypeLetter && listCells[6] == botTypeLetter ||
			 listCells[1] == botTypeLetter && listCells[4] == botTypeLetter && listCells[7] == botTypeLetter ||
			 listCells[2] == botTypeLetter && listCells[5] == botTypeLetter && listCells[8] == botTypeLetter ||
			 listCells[0] == botTypeLetter && listCells[4] == botTypeLetter && listCells[8] == botTypeLetter ||
			 listCells[6] == botTypeLetter && listCells[4] == botTypeLetter && listCells[2] == botTypeLetter) {
			isEndGame = true, whoWinner = "bot";
		}
		return {isEndGame, whoWinner};
	}
	mapChecker(playerTypeLetter, botTypeLetter)







	function logStartGame() {
		console.log(scoreRange == 1 ? "Игра будет идти до первой победы." :
		scoreRange == 3 ? "Игра будет идти до 3 побед." : 
						scoreRange == 5 ? "Игра будет идти до 5 побед." :
						"Что-то пошло не так, перезагрузите страницу и выберите, до скольки будет идти игра.");
	}
}










// const getRandomInt = (min, max) => ~~(Math.random() * (max - min)) + min; // min to max (not including max)
// const cells = document.getElementsByClassName("tictactoe-cell");
// for (let i = 0; i < cells.length; i++) {
// 	cells[i].addEventListener("click", () => {
// 		const collecion = document.querySelectorAll(".tictactoe-cell:not(.active)");
// 		if (collecion.length == 1) exit({endGameCause: "draw"});
// 		if (!cells[i].classList.contains("active")) {
// 			if(whoseMove == "player") {
// 				if(cells[i].innerHTML == "") {
// 					cells[i].classList.add("active");
// 					cells[i].classList.add("active_x");
// 					cells[i].innerHTML = "x"
// 				}
// 				if (checkMap().endGame) {
// 					isGame = !isGame;
// 					exit();
// 				}
// 				whoseMove = "bot";
// 			}
// 			isGame && botMove();
// 		}
// 	});
// }

// function botMove() {
// 	const collecion = document.querySelectorAll(".tictactoe-cell:not(.active)");
// 	if (collecion.length == 1) exit({endGameCause = "draw"});
// 	const items = document.querySelectorAll(".tictactoe-cell:not(.active)");

// 	let step = getRandomInt(0, items.length);

// 	items[step].innerHTML = "0";
// 	items[step].classList.add("active");
// 	items[step].classList.add("active_o");

// 	if (checkMap().endGame) {
// 		isGame = !isGame;
// 		exit();
// 	}
// 	let resultGame = checkMap().endGame;
// 	let whoseWin = checkMap().endGameCause;
// 	checkMap().endGame && exit(resultGame, whoseWin);

// 	whoseMove = "player";
// }

// function checkMap() {
// 	const listCells = document.querySelectorAll(".tictactoe-cell");
// 	const cells = [];
// 	let endGame = false, endGameCause = null;
// 	for (let i = 0; i < listCells.length; i++) { 
// 		cells.push(listCells[i].textContent);
// 	}

// 	if (cells[0] == "x" && cells[1] == 'x' && cells[2] == 'x' ||
// 		 cells[3] == "x" && cells[4] == 'x' && cells[5] == 'x' ||
// 		 cells[6] == "x" && cells[7] == 'x' && cells[8] == 'x' ||
// 		 cells[0] == "x" && cells[3] == 'x' && cells[6] == 'x' ||
// 		 cells[1] == "x" && cells[4] == 'x' && cells[7] == 'x' ||
// 		 cells[2] == "x" && cells[5] == 'x' && cells[8] == 'x' ||
// 		 cells[0] == "x" && cells[4] == 'x' && cells[8] == 'x' ||
// 		 cells[6] == "x" && cells[4] == 'x' && cells[2] == 'x')
// 		 endGame = true, endGameCause = "player";

// 	if (cells[0] == "0" && cells[1] == '0' && cells[2] == '0' ||
// 		 cells[3] == "0" && cells[4] == '0' && cells[5] == '0' ||
// 		 cells[6] == "0" && cells[7] == '0' && cells[8] == '0' ||
// 		 cells[0] == "0" && cells[3] == '0' && cells[6] == '0' ||
// 		 cells[1] == "0" && cells[4] == '0' && cells[7] == '0' ||
// 		 cells[2] == "0" && cells[5] == '0' && cells[8] == '0' ||
// 		 cells[0] == "0" && cells[4] == '0' && cells[8] == '0' ||
// 		 cells[6] == "0" && cells[4] == '0' && cells[2] == '0')
// 		 endGame = true, endGameCause = "bot";

// 	return {endGame, endGameCause};
// }

// function exit(resultGame, whoseWin) {
// 	alert(resultGame + whoseWin);
// 	location.reload();
// };