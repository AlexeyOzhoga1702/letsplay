export function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}
// function restartGame() {
//    game.snake = {
//       x: getRandomInt(5, 15) * grid,
//       y: getRandomInt(5, 15) * grid,
//       dx: grid,
//       dy: 0,
//       cells: [],
//       maxCells: 4,
//    };
//    game.apple = {
//       x: getRandomInt(3, 15) * grid,
//       y: getRandomInt(3, 8) * grid
//    };
// }