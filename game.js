const gameBoard = GameBoard("Emad", "Rama");

document.getElementById("reset-game").addEventListener("click", () => {
  gameBoard.resetGame();
});

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
  let currentPlayer = secondPlayer;
  let game = [new Array(3), new Array(3), new Array(3)];
  let winner = null;
  let gameState = 0;

  play = function (x, y) {
    if (winner) {
      return null;
    }
    if (game[x][y]) {
      return null;
    }
    if (currentPlayer === firstPlayer) {
      currentPlayer = secondPlayer;
      game[x][y] = secondPlayer.icon;
    } else {
      currentPlayer = firstPlayer;
      game[x][y] = firstPlayer.icon;
    }
    gameOver();
    return currentPlayer.icon;
  };

  gameOver = function () {
    for (let i = 0; i < 3; i++) {
      let columnCount = 0;
      let rowCount = 0;
      for (let j = 0; j < 3; j++) {
        if (game[i][j] === currentPlayer.icon) {
          rowCount++;
        }

        if (game[j][i] === currentPlayer.icon) {
          columnCount++;
        }

        if (rowCount === 3 || columnCount === 3) {
          winner = currentPlayer.name;
          callWinner();
          return;
        }
      }
    }

    if (
      (currentPlayer.icon === game[0][0] &&
        game[0][0] === game[1][1] &&
        game[2][2]) ||
      (currentPlayer.icon === game[0][2] &&
        game[0][2] === game[1][1] &&
        game[2][0])
    ) {
      winner = currentPlayer.name;
      callWinner();
      return;
    }

    gameState++;
    if (gameState === 9) {
      winner = "draw";
      callWinner();
    }
  };

  callWinner = function () {
    const label = document.createElement("div");
    label.classList.add("winning-message");

    if (winner === "draw") {
      label.textContent = "Nobody wins, game is a Draw";
    } else {
      label.textContent = currentPlayer.name + " has Won the game!";
    }

    document.body.appendChild(label);
  };

  resetGame = function () {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.textContent = "";
    });

    currentPlayer = secondPlayer;
    game = [new Array(3), new Array(3), new Array(3)];
    winner = null;
    gameState = 0;
    const label = document.querySelector(".winning-message");
    document.body.removeChild(label);
  };

  return { play, resetGame };
}
