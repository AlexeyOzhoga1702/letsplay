// Snake game main
const gameField = document.getElementById('game'),
      context = gameField.getContext('2d'),
      grid = 16;

const startGame = gamemode => requestAnimationFrame(gamemode);
let getRandomInt = (min, max) => ~~(Math.random() * (max - min)) + min;
let count = 0,
    game = {
       snake: {
          x: getRandomInt(5, 15) * grid,
          y: getRandomInt(5, 15) * grid,
          dx: grid,
          dy: 0,
          cells: [],
          numbCells: 3,
       },
       apple: {
          x: getRandomInt(2, 25) * grid,
          y: getRandomInt(2, 25) * grid
       },
       points: 0,
    };

// Snake default gameloop function
function snakeDefault() {
   const snakeAnimation = requestAnimationFrame(snakeDefault),
         optionsSpeedRange = document.getElementById('speed-range').value,
         modalGameover = document.getElementById('gameover-modal'),
         snakeColorValue = document.getElementById('snake-color').value,
         appleColorValue = document.getElementById('apple-color').value;

   function endGame(snakeAnimation) {
      cancelAnimationFrame(snakeAnimation);
      clearTimeout(time);
      const causeOfDeath = document.createElement('p'),
            numberOfPoints = document.createElement('p'),
            timePassed = document.createElement('p');
      causeOfDeath.textContent = game.causeOfDeath;
      numberOfPoints.textContent = "Яблок съедено: " + game.points;
      timePassed.textContent = "Время прошло: " + (minutes > 9 ? minutes : "0" + minutes)
                                             + ":" + (second > 9 ? second : "0" + second);
      modalGameover.append(causeOfDeath, numberOfPoints, timePassed);
      gameLogo.classList.toggle('_hide');
      modalGameover.classList.toggle('_hide');
      gameIndicatorTimer.classList.add('_hide');
      gameIndicatorApples.classList.add('_hide');
   }

   // FPS   
   if (++count < 12) return;
   count = optionsSpeedRange;

   context.clearRect(0, 0, gameField.width, gameField.height);

   
   if ([game.snake.x, game.snake.y].includes(0) ||
   game.snake.x >= gameField.width ||
   game.snake.y >= gameField.height) {
      game.causeOfDeath = "Вы попытались улизнуть за границу карты."
      endGame(snakeAnimation);
   }

   // Movement
   game.snake.x += game.snake.dx;
   game.snake.y += game.snake.dy;

   game.snake.cells.unshift({ x: game.snake.x, y: game.snake.y });
   if (game.snake.cells.length > game.snake.numbCells) game.snake.cells.pop();

   context.fillStyle = (appleColorValue.length == 6 && /[a-zA-Z0-9]/.test(appleColorValue)) ? context.fillStyle = "#" + appleColorValue : context.fillStyle = "#FF6347";
   context.fillRect(game.apple.x, game.apple.y, grid - 1, grid - 1);

   game.snake.cells.forEach((cell, index) => {
      context.fillStyle = snakeColorValue.length == 6 && /[a-zA-Z0-9]/.test(snakeColorValue) ? context.fillStyle = "#" + snakeColorValue : context.fillStyle = "#228C22";
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

      if (cell.x === game.apple.x && cell.y === game.apple.y) ateApple();

      for (let i = index + 1; i < game.snake.cells.length; i++)
         if (cell.x === game.snake.cells[i].x &&
             cell.y === game.snake.cells[i].y) {
            game.causeOfDeath = "Ваша змейка наелась собой."
            endGame(snakeAnimation);
         }
   });
}


// Snake movement
document.addEventListener('keydown', e => {
   if (e.which === 37 && game.snake.dx === 0 || // A (left)
       e.which === 65 && game.snake.dx === 0) {
       game.snake.dx = -grid;
       game.snake.dy = 0;
   } else if (e.which === 38 && game.snake.dy === 0 || // W (up)
              e.which === 87 && game.snake.dy === 0) {
              game.snake.dy = -grid;
              game.snake.dx = 0;
   } else if (e.which === 39 && game.snake.dx === 0 || // D (right)
              e.which === 68 && game.snake.dx === 0) {
              game.snake.dx = grid;
              game.snake.dy = 0;
   } else if (e.which === 40 && game.snake.dy === 0 || // S (down)
              e.which === 83 && game.snake.dy === 0) {
              game.snake.dy = grid;
              game.snake.dx = 0;
   }
})

function ateApple() {
   game.apple.x = getRandomInt(0, 25) * grid;
   game.apple.y = getRandomInt(0, 25) * grid;
   game.snake.numbCells++;
   game.points++;
   gameApples.textContent = game.points;
}

// Modals
const modalOptions = document.getElementById('modal-options'),
      buttonOptions = document.getElementById('options-button'),
      buttonStart = document.getElementById('start-button'),
      buttonGameover = document.getElementById('gameover-button'),

      gameLogo = document.getElementById('game-logo'),

      gameIndicatorTimer = document.getElementById('game-indicator-timer'),
      gameTimer = document.getElementById('indicator-timer'),

      gameIndicatorApples = document.getElementById('game-indicator-apples'),
      gameApples = document.getElementById('indicator-apples');

buttonOptions.addEventListener('click', () => {
      buttonOptions.classList.add('_hide');
      modalOptions.classList.toggle('_hide');
});

buttonStart.addEventListener('click', () => {
   gameLogo.classList.add('_hide');
   modalOptions.classList.add('_hide');
   buttonOptions.classList.add('hide');

   setTimeout(startGame, 1000, snakeDefault);
   gameIndicatorTimer.classList.toggle('_hide');
   gameIndicatorApples.classList.toggle('_hide');
   timer();
})

buttonGameover.addEventListener('click', () => location.reload())

// Timer
let second = 0,
    minutes = 0,
    hours = 0,
    time;
function perTick() {
   second++;
   if (second == 60) {
      second = 0;
      minutes++;
   }
}

function add() {
   perTick();
   gameTimer.textContent = (minutes > 9 ? minutes : "0" + minutes)
                   + ":" + (second > 9 ? second : "0" + second);
   timer();
}

const timer = () => time = setTimeout(add, 1000);