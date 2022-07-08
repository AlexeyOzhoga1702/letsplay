const buttonStart = document.querySelector('.start-button');
const gamefield = document.querySelector('.gamefield');

buttonStart.addEventListener('click', () => {
   buttonStart.classList.add('_hide');
   gamefield.classList.toggle('_hide');

   !gamefield.classList.contains('_hide') ? firstTurn() : location.reload();
})

function firstTurn() {
   const gameItem = document.querySelectorAll('.gamefield-card');
   gameItem.forEach(item => item.addEventListener('click', () => {
      if (item.classList.contains('rock')) {
         const turnPlayer = "Камень";
         resultGame(turnPlayer);
      } else if (item.classList.contains('scissors')) {
         const turnPlayer = "Ножницы";
         resultGame(turnPlayer);
      } else {
         const turnPlayer = "Бумага";
         resultGame(turnPlayer);
      }
   }));
}

function resultGame(turnPlayer) {
   const randomInt = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
   const secondTurn = randomInt(1, 3);

   const itemBotTurn = secondTurn === 1 ? "Камень" : secondTurn === 2 ? "Бумага" : "Ножницы";

   if (turnPlayer === "Камень" && itemBotTurn === "Камень" ||
       turnPlayer === "Ножницы" && itemBotTurn === "Ножницы" ||
       turnPlayer === "Бумага" && itemBotTurn === "Бумага") endGame("Ничья.");
   if (turnPlayer == "Камень" && itemBotTurn == "Ножницы" ||
       turnPlayer == "Ножницы" && itemBotTurn == "Бумага") endGame("Победили Вы.");
   if (turnPlayer == "Камень" && itemBotTurn == "Бумага" ||
       turnPlayer == "Бумага" && itemBotTurn == "Ножницы") endGame("Победил противник.", itemBotTurn, turnPlayer)
}

const endGame = (causeEndGame, secondTurn, turnPlayer) => console.log("Игра окончена. " + causeEndGame + " Соперник выбрал: " + secondTurn + "Вы выбрали: " + turnPlayer);