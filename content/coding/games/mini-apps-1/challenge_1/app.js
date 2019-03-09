document.addEventListener("DOMContentLoaded", function(event) { 
  let p1 = document.getElementById('p1');
  let p2 = document.getElementById('p2');
  let p1Score = document.getElementById('p1Score');
  let p2Score = document.getElementById('p2Score');
  let turn = document.getElementById('turn');
  let app = document.getElementById('app');
  let winner = document.getElementById('winner');


  // Defining some important game variables.
  let played = [];
  let won = false;
  let p1Next = true;
  let currentPlayer;
  p1.innerHTML = player1 = prompt('Who is Player 1?');
  p1.innerHTML += ' (X)';
  p2.innerHTML = player2 = prompt('Who is Player 2?');
  p2.innerHTML += ' (O)';

  while (player1 === player2) {
    player2 = prompt('Player 2 should have a different name than Player 1. Who is Player 2?');
    p2.innerHTML = player2;
  }

  // -------------  Helper functions  ------------- //
  const xOrO = (content, xCount, oCount) => {
    if (content.innerHTML === 'X') {
      xCount += 1
    } else if (content.innerHTML === 'O') {
      oCount += 1;
    }
    return [xCount, oCount];
  };

  const resetCounts = () => {
    return [0, 0];
  };

  
  // Checks each row to see if a player won.
  const checkRows = () => {
    for (let row = 0; row < 3; row += 1) {
      let [xCount, oCount] = resetCounts();

      for (let col = 0; col < 3; col += 1) {
        let content = document.getElementById(row.toString() + col.toString());
        [xCount, oCount] = xOrO(content, xCount, oCount);
      }

      if (xCount === 3 || oCount === 3) {
        return true;
      }
    }

    return false;
  };
  
  // Checks each column to see if a player won.
  const checkCols = () => {
    for (let row = 0; row < 3; row += 1) {
      let [xCount, oCount] = resetCounts();

      for (let col = 0; col < 3; col += 1) {
        let content = document.getElementById(col.toString() + row.toString());
        [xCount, oCount] = xOrO(content, xCount, oCount);
      }

      if (xCount === 3 || oCount === 3) {
        return true;
      } 
    }

    return false;
  };
  
  // Checks both diagonals to see if a player has won.
  const checkDiagonals = () => {
    // Major diagonal
    let [xCount, oCount] = resetCounts();
    for (let rowAndCol = 0; rowAndCol < 3; rowAndCol += 1) {
      let content = document.getElementById(rowAndCol.toString() + rowAndCol.toString());
      [xCount, oCount] = xOrO(content, xCount, oCount);
    }
    
    if (xCount === 3 || oCount === 3) {
      return true;
    }

    // Reset xCount and oCount.
    [xCount, oCount] = resetCounts();

    // Minor diagonal
    // Define col to subtract from it as we iterate on each row to get the corresponding column index
    let col = 2;
    for (let row = 0; row < 3; row += 1) {
      let content = document.getElementById(row.toString() + col.toString());
      [xCount, oCount] = xOrO(content, xCount, oCount);
      col -= 1;
    }
    
    if (xCount === 3 || oCount === 3) {
      return true;
    }

    // Return false if no major diagonal nor minor diagonal has returned an xCount or oCount of 3.
    return false;
  };
  
  const checkWins = () => {
    return checkCols() || checkRows() || checkDiagonals();
  };

  // -------------  End of helper functions  ------------- //


  // -------------  Render functions  ------------- //

  const incrementWinnerCount = (winner) => {
    if (winner === player1) {
      p1Score.innerHTML = Number(p1Score.innerHTML) + 1;
    } else if (winner === player2) {
      p2Score.innerHTML = Number(p2Score.innerHTML) + 1;
    }
  };

  // Display who's turn it is.
  const displayTurn = () => {
    currentPlayer = p1Next ? player1 : player2;
    turn.innerHTML = currentPlayer + '\'s turn:'; 
  };

  // Displays 'X' or 'O' depending on who played.
  const display = (event) => {
    // Don't modify the board if the game has already ended or if user
    // clicks on the same button that has already been played.
    if (played.indexOf(event.target.id) !== -1 || won) {
      return;
    }

    // Played array contains all of the clicked buttons' html ids.
    played.push(event.target.id);
    event.target.innerHTML = p1Next ? 'X' : 'O';
    p1Next = !p1Next;
    
    // Check if any player has won.
    won = checkWins();
    if (!won) {
      displayTurn();
    }

    if (won) {
      currentPlayer = p1Next ? player2 : player1;
      incrementWinnerCount(currentPlayer);
      p1Next = !p1Next;
      winner.innerHTML = currentPlayer + ' won!';
    } else if (!won && played.length === 9) {
      winner.innerHTML = 'Tie!';
    }

  };


  // -------------  End of render functions  ------------- //

  
  // -------------  Init functions  ------------- //

  const createGame = () => {
    // Reset variables if they contain any value.
    app.innerHTML = '';
    winner.innerHTML = '';
    played = [];
    won = false;
    
    // Render the 3 x 3 Tic-Tac-Toe board:
    // 1. Create each row
    for (let row = 0; row < 3; row += 1) {
      let div = document.createElement('div');
      let newRow = app.appendChild(div);

      // 2. Create each column per row
      for (let col = 0; col < 3; col += 1) {
        let button = document.createElement('button');
        button.id = row.toString() + col.toString();
        button.classList.add('box');
        button.innerHTML = '&nbsp;&nbsp;';
        button.addEventListener("click", display);
        newRow.appendChild(button);
      }
    }

    displayTurn();
  }

  // If players want to reset the board, run createGame again.
  document.getElementById('new').addEventListener('click', createGame);

  createGame();
});
