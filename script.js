const gameController = (() => {
  let currentMark = 'x';
  let gridWidth = 3;
  let gridHeight = 3;

  let currentWinner = '';
  let playerMark = 'x';
  let computerMark = 'o';

  const onGameFieldClick = function() {
    if (currentMark === playerMark && this.innerHTML === 'empty')
    {
      markGameField(this, playerMark);
    }
  }

  const list = document.querySelectorAll('.gamefield');

  for (const el of list) {
    el.addEventListener('click', onGameFieldClick);
  }

  const resetField = function() {
    currentMark = 'x';
    for (el of list) {
      el.innerHTML = 'empty';
    }
  }

  const resetButton = document.querySelector('#reset_button');
  resetButton.addEventListener('click', resetField);

  const markGameField = function(gameField, mark) {
    gameField.innerHTML = mark;
    if (gameEnded()) {
      if (currentWinner !== '') {
        console.log('game ended! winner mark - ' + currentMark);
      }
      else {
        console.log('game ended in a TIE');
      }

    }
    else {
      currentMark = (currentMark === playerMark) ? computerMark : playerMark;
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
            && list[row + col].innerHTML === currentMark
            && list[row + col + 1].innerHTML === currentMark
            && list[row + col + 2].innerHTML === currentMark) {
          console.log('row has 3 marks!');
          currentWinner = currentMark;
          return true;
        }
        // col check
        else if (row + gridHeight < gridWidth * gridHeight
            && row + gridHeight * 2 < gridWidth * gridHeight
            && list[row + col].innerHTML === currentMark
            && list[row + gridHeight + col].innerHTML === currentMark
            && list[row + gridHeight * 2 + col].innerHTML === currentMark) {
          console.log('col has 3 marks!');
          currentWinner = currentMark;
          return true;
        }
        // diagonal forward up
        else if (col + 1 < gridWidth
                && col + 2 < gridWidth
                && row - gridHeight >= 0
            && row - gridHeight * 2 >= 0
            && list[row + col].innerHTML === currentMark
            && list[row - gridHeight + col + 1].innerHTML === currentMark
            && list[row - gridHeight * 2 + col + 2].innerHTML === currentMark) {
          console.log('diagonal forward up has 3 marks!');
          currentWinner = currentMark;
          return true;
        }
        // diagonal forward down
        else if (col + 1 < gridWidth
                && col + 2 < gridWidth
                && row + gridHeight < gridWidth*gridHeight
            && row + gridHeight * 2  < gridWidth*gridHeight
            && list[row + col].innerHTML === currentMark
            && list[row + gridHeight + col + 1].innerHTML === currentMark
            && list[row + gridHeight * 2 + col + 2].innerHTML === currentMark) {
          console.log('diagonal forward down has 3 marks!');
          currentWinner = currentMark;
          return true;
        }
      }
    }
    console.log('checking if game ended in a TIE!');
    let allFieldsAreMarked = true;
    for (const span of list) {
      if (span.innerHTML === 'empty') {
        allFieldsAreMarked = false;
        break;
      }
    }
    return allFieldsAreMarked;
  }

  const playNextTurn = function() {
    if (currentMark === playerMark) {
      console.log('waiting for the player to make a turn')
    }
    else {
      let emptyFields = [];
      for (el of list) {
        if (el.innerHTML === 'empty') emptyFields.push(el);
      }
      markGameField(emptyFields[Math.floor(Math.random()*emptyFields.length)], computerMark);
    }
  }

})();