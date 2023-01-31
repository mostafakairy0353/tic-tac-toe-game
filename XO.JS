let move = { row: 0, col: 0 };
let player = "o";
let opponent = "x";
let board = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];
let min = (x, y) => {
  if (x < y) return x;
  return y;
};
let max = (x, y) => {
  if (x > y) return x;
  return y;
};
let isMovesLeft = (board) => {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (board[i][j] == "_") return true;
  return false;
};
let evaluate = (board) => {
  for (let row = 0; row < 3; row++) {
    if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
      if (board[row][0] == player) return +10;
      else if (board[row][0] == opponent) return -10;
    }
  }
  for (let col = 0; col < 3; col++) {
    if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {
      if (board[0][col] == player) return +10;
      else if (board[0][col] == opponent) return -10;
    }
  }
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
    if (board[0][0] == player) return +10;
    else if (board[0][0] == opponent) return -10;
  }
  if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
    if (board[0][2] == player) return +10;
    else if (board[0][2] == opponent) return -10;
  }
  return 0;
};
let minimax = (board, depth, isMax) => {
  let score = evaluate(board);
  if (score == 10) return score;
  if (score == -10) return score;
  if (isMovesLeft(board) == false) return 0;
  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "_") {
          board[i][j] = player;
          best = max(best, minimax(board, depth + 1, !isMax));
          board[i][j] = "_";
        }
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "_") {
          board[i][j] = opponent;
          best = min(best, minimax(board, depth + 1, !isMax));
          board[i][j] = "_";
        }
      }
    }
    return best;
  }
};
let findBestMove = (board) => {
  let bestVal = -1000;
  let bestMove = { row: -1, col: -1 };
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "_") {
        board[i][j] = player;
        let moveVal = minimax(board, 0, false);
        board[i][j] = "_";
        if (moveVal > bestVal) {
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal;
        }
      }
    }
  }
  return bestMove;
};
let formate = (word) => {
  for (x of word) {
    if (!isNaN(Number(x)) && x != " ") return x;
  }
};
let print = () => {
  console.log(board);
};
let remove = () => {
  let cell = document.querySelectorAll(".cell");
  cell.forEach((current) => {
    current.onclick = () => {
      console.log("error");
    };
  });
};
let increase = (x) => {
  if (x == "x") {
    let element = document.querySelector(".human");
    element.innerHTML -= -1;
  } else if (x == "o") {
    let element = document.querySelector(".ai");
    element.innerHTML -= -1;
  }
};
let reset = () => {
  let cell = document.querySelectorAll(".cell");
  let i = 1;
  cell.forEach((current) => {
    current.setAttribute("name", "_");
    current.innerHTML = `<i class="fa-solid fa-${i++}"></i>`;
  });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) board[i][j] = "_";
  document.querySelector(".game-over").style.display = "none";
  game();
};
let gameOver = (x) => {
  setTimeout(() => {
    document.querySelector(".game-over").style.display = "flex";
    let winner = document.querySelector(".game-over .winner");
    let again = document.querySelector(".game-over button");
    again.onclick = () => {
      reset();
    };
    if (x == "o") {
      winner.innerHTML = "AI win";
      increase("o");
    } else if (x == "x") {
      winner.innerHTML = "Human win";
      increase("x");
    } else if (x == 0) winner.innerHTML = "Draw";
    console.log(x);
  }, 1000);
};
let check = (board) => {
  if (
    board[0][0] == board[0][1] &&
    board[0][1] == board[0][2] &&
    board[0][1] != "_"
  )
    gameOver(board[0][1]);
  else if (
    board[1][0] == board[1][1] &&
    board[1][1] == board[1][2] &&
    board[1][1] != "_"
  )
    gameOver(board[1][1]);
  else if (
    board[2][0] == board[2][1] &&
    board[2][1] == board[2][2] &&
    board[2][1] != "_"
  )
    gameOver(board[2][1]);
  else if (
    board[0][0] == board[1][0] &&
    board[1][0] == board[2][0] &&
    board[1][0] != "_"
  )
    gameOver(board[1][0]);
  else if (
    board[0][1] == board[1][1] &&
    board[1][1] == board[2][1] &&
    board[1][1] != "_"
  )
    gameOver(board[1][1]);
  else if (
    board[0][2] == board[1][2] &&
    board[1][2] == board[2][2] &&
    board[0][2] != "_"
  )
    gameOver(board[1][2]);
  else if (
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2] &&
    board[1][1] != "_"
  )
    gameOver(board[1][1]);
  else if (
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0] &&
    board[1][1] != "_"
  )
    gameOver(board[1][1]);
};
let game = () => {
  let cell = document.querySelectorAll(".cell");
  cell.forEach((current) => {
    if (current.getAttribute("name") == "_") {
      current.onclick = () => {
        remove();
        let x = Math.floor((formate(current.innerHTML) - 1) / 3);
        let y = (formate(current.innerHTML) - 1) % 3;
        board[x][y] = "x";
        current.setAttribute("name", "X");
        setTimeout(() => {
          current.innerHTML = `<i class="fa-solid fa-x"></i>`;
        }, 1000);
        bestMove = findBestMove(board);
        if (bestMove.row == -1) {
          gameOver(0);
          return;
        }
        board[bestMove.row][bestMove.col] = "o";
        let i = bestMove.row * 3 + (bestMove.col + 1);
        let c = document.querySelector(`.cell:nth-child(${i})`);
        setTimeout(() => {
          c.setAttribute("name", "O");
        }, 2000);
        setTimeout(() => {
          c.innerHTML = `<i class="fa-solid fa-o"></i>`;
          check(board);
          game();
        }, 3000);
        print();
      };
    }
  });
};

game();