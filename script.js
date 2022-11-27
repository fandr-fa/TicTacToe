const gameController = (() => {
  let gridWidth = 3;
  let gridHeight = 3;

  // marks
  let currentMark = 'x';
  let playerMark = 'x';
  let computerMark = 'o';
  document.getElementById('mark-x').classList.add('selected-mark');

  const onMarkClick = function() {
    if (this.classList.contains("selected-mark")) {
      return;
    }

    this.classList.add('selected-mark');
    if (this.id ==='mark-x') {
      playerMark = 'x';
      computerMark = 'o';
      document.getElementById('mark-o').classList.remove('selected-mark');
    }
    else {
      playerMark = 'o';
      computerMark = 'x';
      document.getElementById('mark-x').classList.remove('selected-mark');
    }
  }

  const marks = document.querySelectorAll('.mark');
  for (const mark of marks) {
    mark.addEventListener('click', onMarkClick);
  }

  // Start Game
  const gameStatus = document.getElementById('game-status');
  const onNewGameButtonClick = function() {
    resetField();
    updateGameStatus();
    playNextTurn();
  }

  const updateGameStatus = function() {
    if (currentMark === playerMark) {
      gameStatus.innerHTML = 'Your turn';
    }
    else {
      gameStatus.innerHTML = "Computer's turn. Computer is thinking ...";
    }
  }

  const newGameButton = document.getElementById('new-game-button');
  newGameButton.addEventListener('click', onNewGameButtonClick);

  // Game Field
  const onGameFieldClick = function() {
    if (currentMark === playerMark && this.innerHTML === '') {
      markGameField(this, playerMark);
    }
  }

  const gameBoard = document.querySelectorAll('.gamefield');

  for (const gameField of gameBoard) {
    gameField.addEventListener('click', onGameFieldClick);
  }

  const resetField = function() {
    currentMark = 'x';
    for (gameField of gameBoard) {
      gameField.innerHTML = '';
    }
  }

  let currentWinner = '';
  const markGameField = function(gameField, mark) {
    gameField.innerHTML = mark;
    if (gameEnded()) {
      if (currentWinner === playerMark) {
        gameStatus.innerHTML = 'You win!';
      }
      else if (currentWinner === computerMark) {
        gameStatus.innerHTML = 'Computer win!';
      }
      else {
        gameStatus.innerHTML = 'Game ended in a TIE!';
      }
    }
    else {
      currentMark = (currentMark === playerMark) ? computerMark : playerMark;
      updateGameStatus();
      playNextTurn();
    }
  }

  const gameEnded = function() {
    for (let row = 0; row < gridHeight * gridWidth; row = row + gridWidth) {
      for (let col = 0; col < gridWidth; col++) {
        // we walk row after row, column after column
        // so we don't need to checks backwards
        // row check
        if (col + 1 < gridWidth
            && col + 2 < gridWidth
            && gameBoard[row + col].innerHTML === currentMark
            && gameBoard[row + col + 1].innerHTML === currentMark
            && gameBoard[row + col + 2].innerHTML === currentMark) {
          currentWinner = currentMark;
          return true;
        }
        // col check
        else if (row + gridHeight < gridWidth * gridHeight
            && row + gridHeight * 2 < gridWidth * gridHeight
            && gameBoard[row + col].innerHTML === currentMark
            && gameBoard[row + gridHeight + col].innerHTML === currentMark
            && gameBoard[row + gridHeight * 2 + col].innerHTML === currentMark) {
          currentWinner = currentMark;
          return true;
        }
        // diagonal forward up
        else if (col + 1 < gridWidth
                && col + 2 < gridWidth
                && row - gridHeight >= 0
            && row - gridHeight * 2 >= 0
            && gameBoard[row + col].innerHTML === currentMark
            && gameBoard[row - gridHeight + col + 1].innerHTML === currentMark
            && gameBoard[row - gridHeight * 2 + col + 2].innerHTML === currentMark) {
          currentWinner = currentMark;
          return true;
        }
        // diagonal forward down
        else if (col + 1 < gridWidth
                && col + 2 < gridWidth
                && row + gridHeight < gridWidth*gridHeight
            && row + gridHeight * 2  < gridWidth*gridHeight
            && gameBoard[row + col].innerHTML === currentMark
            && gameBoard[row + gridHeight + col + 1].innerHTML === currentMark
            && gameBoard[row + gridHeight * 2 + col + 2].innerHTML === currentMark) {
          currentWinner = currentMark;
          return true;
        }
      }
    }
    let allFieldsAreMarked = true;
    for (const span of gameBoard) {
      if (span.innerHTML === '') {
        allFieldsAreMarked = false;
        break;
      }
    }
    return allFieldsAreMarked;
  }

  const playNextTurn = function() {
    if (currentMark === playerMark) {
    }
    else {
      let emptyFields = [];
      for (gameField of gameBoard) {
        if (gameField.innerHTML === '') emptyFields.push(gameField);
      }
      let randomGameField = emptyFields[Math.floor(Math.random()*emptyFields.length)];
      setTimeout(markGameFieldWithDelay, 2000, randomGameField);
    }
  }

  const markGameFieldWithDelay = function(randomGameField) {
    markGameField(randomGameField, computerMark);
  }

})();