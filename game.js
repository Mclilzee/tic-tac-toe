const gameBoard = GameBoard("Emad", "Rama");

document.getElementById("reset-game").addEventListener("click", () => {gameBoard.resetGame()})

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", () => {
    const positions = cell.id.split("");
    const icon = gameBoard.play(positions[0], positions[1]);
    if (icon) {
      cell.textContent = icon;
    }
  });
});

function GameBoard(player1, player2) {
  const firstPlayer = { name: player1, icon: "X" };
  const secondPlayer = { name: player2, icon: "O" };
  let currentPlayer = firstPlayer;
  let game = [new Array(3), new Array(3), new Array(3)];
  console.log(game);


  play = function (x, y) {
    console.log(x)
    if (game[x][y]) {
      return null;
    }
    if (currentPlayer.icon === "X") {
      currentPlayer = secondPlayer;
      game[x][y] = firstPlayer.icon;
      console.log(game)
      return firstPlayer.icon;
    } else {
      currentPlayer = firstPlayer;
      game[x][y] = secondPlayer.icon;
      console.log(game)
      return secondPlayer.icon;
    }
  };



  resetGame = function() {
    document.querySelectorAll(".cell").forEach(cell => {
      cell.textContent = "";
    });

    game = [new Array(3), new Array(3), new Array(3)];
  }

  return { play, resetGame };
}

function gameOver() {
  return true;
}
