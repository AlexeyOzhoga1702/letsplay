import {getRandomInt} from './snake-random.js';

let gameField = document.getElementById('game');
let context = gameField.getContext('2d');
let grid = 16;
let count = 0;
let game = {
   snake: {
      x: 200,
      y: 200,
      dx: grid,
      dy: 0,
      cells: [],
      maxCells: 4,
   },
   apple: {
      x: getRandomInt(3, 15) * grid,
      y: getRandomInt(3, 8) * grid
   },
};

function snakeGameLoop() {
   requestAnimationFrame(snakeGameLoop);
   if (++count < 4) return;
   count = 0;
   context.clearRect(0, 0, gameField.width, gameField.height);
   game.snake.x += game.snake.dx;
   game.snake.y += game.snake.dy;
   if (game.snake.x < 0) {
      restartGame();
   } else if (game.snake.x >= gameField.width) {
      restartGame();
   }
   if (game.snake.y < 0) {
      restartGame();
   } else if (game.snake.y >= gameField.height) {
      restartGame();
   }
   game.snake.cells.unshift({ x: game.snake.x, y: game.snake.y });
   if (game.snake.cells.length > game.snake.maxCells) {
      game.snake.cells.pop();
   }
   context.fillStyle = 'red';
   context.fillRect(game.apple.x, game.apple.y, grid - 1, grid - 1);
   context.fillStyle = 'green';
   game.snake.cells.forEach(function (cell, index) {
   context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
   if (cell.x === game.apple.x && cell.y === game.apple.y) {
      game.snake.maxCells++;
      game.apple.x = getRandomInt(0, 25) * grid;
      game.apple.y = getRandomInt(0, 25) * grid;
   }
   for (var i = index + 1; i < game.snake.cells.length; i++) {
      if (cell.x === game.snake.cells[i].x && cell.y === game.snake.cells[i].y) {
         restartGame();
      }
   }
   });
}
document.addEventListener('keydown', function (e) {
   if (e.which === 37 && game.snake.dx === 0) {
      game.snake.dx = -grid;
      game.snake.dy = 0;
      cancelAnimationFrame(snakeStart);
   } else if (e.which === 38 && game.snake.dy === 0) {
      game.snake.dy = -grid;
      game.snake.dx = 0;
   } else if (e.which === 39 && game.snake.dx === 0) {
      game.snake.dx = grid;
      game.snake.dy = 0;
   } else if (e.which === 40 && game.snake.dy === 0) {
      game.snake.dy = grid;
      game.snake.dx = 0;
   }
});

requestAnimationFrame(snakeGameLoop);