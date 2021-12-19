const gameBoard = GameBoard();

document.getElementById("play-again").addEventListener("click", () => {
  gameBoard.playAgain();
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

document.querySelector("#first-name-button").addEventListener("click", () => {
  const name = prompt("Choose your player name");
  gameBoard.setFirstName(name);
});

document.querySelector("#second-name-button").addEventListener("click", () => {
  const name = prompt("Choose your player name");
  gameBoard.setSecondName(name);
});

document.querySelector("#reset-board").addEventListener("click", () => {
  gameBoard.resetBoard();
});

function GameBoard() {
  const firstPlayer = { name: "Player1", icon: "X", score: 0 };
  const secondPlayer = { name: "Player2", icon: "O", score: 0 };
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
        game[1][1] === game[2][2]) ||
      (currentPlayer.icon === game[0][2] &&
        game[0][2] === game[1][1] &&
        game[1][1] === game[2][0])
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
    const label = document.querySelector(".winning-message");

    if (winner === "draw") {
      label.textContent = "Nobody wins, game is a Draw";
    } else {
      label.textContent = currentPlayer.name + " has Won the game!";
    }

    currentPlayer.score++;
    document.querySelector(`#${currentPlayer.icon}`).textContent++;
  };

  playAgain = function () {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.textContent = "";
    });

    currentPlayer = secondPlayer;
    game = [new Array(3), new Array(3), new Array(3)];
    winner = null;
    gameState = 0;
    document.querySelector(".winning-message").textContent = "";
  };

  setFirstName = function (name) {
    firstPlayer.name = name;
    document.querySelector("#firstPlayer").textContent = name;
  };

  setSecondName = function (name) {
    secondPlayer.name = name;
    document.querySelector("#secondPlayer").textContent = name;
  };

  resetBoard = function () {
    playAgain();
    firstPlayer.score = 0;
    secondPlayer.score = 0;

    document.getElementById("X").textContent = 0;
    document.getElementById("O").textContent = 0;
  };

  return { play, playAgain, setFirstName, setSecondName, resetBoard };
}
