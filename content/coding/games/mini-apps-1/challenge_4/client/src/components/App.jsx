import React from 'react';
import Table from './Table.jsx';

import { getInitialTable, getColIndexesToFill, ROWS, COLUMNS, } from '../utils/helpers.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: getInitialTable(),
      columnFillTracker: getColIndexesToFill(),
      player1sTurn: true,
      hasWon: {
        someone: false,
        player1: false
      },
      isTied: false,
    };

    this.onCircleClickHandler = this.onCircleClickHandler.bind(this);
    this.checkWinningConditions = this.checkWinningConditions.bind(this);
    this.checkRow = this.checkRow.bind(this);
    this.checkColumn = this.checkColumn.bind(this);
    this.checkDiagonals = this.checkDiagonals.bind(this);
    this.checkMajorDiagonal = this.checkMajorDiagonal.bind(this);
    this.checkMinorDiagonal = this.checkMinorDiagonal.bind(this);
    this.getMajorDiagonalTopRowCol = this.getMajorDiagonalTopRowCol.bind(this);
    this.getMinorDiagonalTopRowCol = this.getMinorDiagonalTopRowCol.bind(this);
    this.checkForTies = this.checkForTies.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  onCircleClickHandler(event) {
    if (this.state.hasWon.someone) return;

    let colIndex = Number(event.target.id.charAt(1))
    let nextRowIndex = this.getNextRowIndex(colIndex);

    // If nextRowIndex is null, means that there is no nextRowIndex. In other words, the
    // row is full and can't be filled any more.
    if (nextRowIndex === null) return;

    let newTable = this.state.table.slice();
    // 1 = blue colored circle
    // 2 = red colored circle
    newTable[nextRowIndex][colIndex] = this.state.player1sTurn ? 1 : 2;

    // Check if Anyone has won
    let newHasWon = Object.assign({}, this.state.hasWon);
    this.checkWinningConditions(newHasWon, newTable, newTable[nextRowIndex][colIndex], nextRowIndex, colIndex);

        
    if (this.checkForTies(this.state.columnFillTracker)) {
      this.setState({ isTied: true });
    }

    this.setState({
      player1sTurn: !this.state.player1sTurn,
      table: newTable,
      hasWon: newHasWon
    }); 
  }

  checkWinningConditions(newHasWon, newTable, colorCode, rowIndex, colIndex) {
    let someoneWon = this.checkRow(newTable, colorCode, rowIndex) || 
      this.checkColumn(newTable, colorCode, colIndex) || 
      this.checkDiagonals(newTable, colorCode, colIndex, rowIndex);
          
    if (someoneWon) {
      newHasWon.someone = true;
      newHasWon.player1 = this.state.player1sTurn;
    }
  }

  // postWinner(player1Won) {
  //   let whoWon = player1Won ? 'Player 1' : 'Player 2';

  //   let options = {
  //     method: 'POST',
  //     body: whoWon
  //   };

  //   fetch('/', options)
  //     .then(() => {
  //       console.log('posted nicely!');
  //       setTimeout(() => this.setState({
  //         table: getInitialTable(),
  //         columnFillTracker: getColIndexesToFill(),
  //         player1: true,
  //         hasWon: {
  //           someone: false,
  //           player1: false
  //         }
  //       }), 5000);
  //     })
  // }


  checkRow(newTable, colorCode, rowIndex) {
    let row = newTable[rowIndex];
    let count = 0;

    for (let i = 0; i < row.length; i += 1) {
      count = row[i] === colorCode ? (count + 1) : 0;
      if (count >= 4) {
        return true;
      }
    }
    
    return false;
  }

  checkColumn(newTable, colorCode, columnIndex) {
    let column = [];
    let count = 0;

    for (let i = 0; i < newTable.length; i += 1) {
      column.push(newTable[i][columnIndex]);
    }

    for (let i = 0; i < column.length; i += 1) {
      count = column[i] === colorCode ? (count + 1) : 0;
      if (count >= 4) {
        return true;
      }
    }
    
    return false;
  }

  checkDiagonals(newTable, colorCode, colIndex, rowIndex) {
    let { majorDiagColIdx, majorDiagRowIdx } = this.getMajorDiagonalTopRowCol(colIndex, rowIndex);
    let { minorDiagColIdx, minorDiagRowIdx } = this.getMinorDiagonalTopRowCol(colIndex, rowIndex);
    return this.checkMajorDiagonal(newTable, colorCode, majorDiagColIdx, majorDiagRowIdx) || this.checkMinorDiagonal(newTable, colorCode, minorDiagColIdx, minorDiagRowIdx);
  }

  checkMajorDiagonal(newTable, colorCode, colIndex, rowIndex) {
    let count = 0;

    for (let r = rowIndex, c = colIndex; r < newTable.length && c < newTable[r].length; r += 1, c += 1) {
      count = newTable[r][c] === colorCode ? (count + 1) : 0;
      if (count >= 4) return true;
    }

    return false;
  }

  checkMinorDiagonal(newTable, colorCode, colIndex, rowIndex) {
    let count = 0;

    for (let r = rowIndex, c = colIndex; r < newTable.length && c < newTable[r].length; r += 1, c -= 1) {
      count = newTable[r][c] === colorCode ? (count + 1) : 0;
      if (count >= 4) return true;
    }

    return false;
  }

  getMajorDiagonalTopRowCol(colIdx, rowIdx) {
    let minDist = Math.min(rowIdx, colIdx);
    
    return { 
      majorDiagColIdx: colIdx - minDist,
      majorDiagRowIdx: rowIdx - minDist,
    };
  }

  getMinorDiagonalTopRowCol(colIdx, rowIdx) {
    let minDist = Math.min(rowIdx, COLUMNS - 1 - colIdx);

    return { 
      minorDiagColIdx: colIdx + minDist,
      minorDiagRowIdx: rowIdx - minDist,
    };
  }

  getNextRowIndex(colIndex) {
    let newColumnFillTracker = this.state.columnFillTracker.slice();

    // If the newColumnFillTracker is the same as the old one, return null so the circleClickHandler
    // function can know that it shouldn't proceed with changing the state because the entire column
    // has already been filled and no need to proceed. Let the user click another circle.
    if (newColumnFillTracker[colIndex] === -1) return null;

    newColumnFillTracker[colIndex] -= 1;
    this.setState({
      columnFillTracker: newColumnFillTracker
    });

    return this.state.columnFillTracker[colIndex];
  }

  checkForTies(arr) {
    let numMinusOnes = 0, numZeros = 0;
    arr.forEach(num => {
      if (num === -1) numMinusOnes += 1;
      if (num === 0) numZeros += 1;
    });

    return (numMinusOnes === COLUMNS - 1) && (numZeros === 1);
  }

  restartGame() {
    this.setState({
      table: getInitialTable(),
      columnFillTracker: getColIndexesToFill(),
      player1sTurn: true,
      hasWon: {
        someone: false,
        player1: false
      },
      isTied: false,
    });
  }

  render() {
    let color = this.state.player1sTurn ? 'Red' : 'Blue';
    let styleColor = color === 'Red' ? 'red' : 'blue';
    let canvasStyle = {fontFamily: 'Arial', background: 'lightgray', width: 500, left: 0, border: '1px solid black', borderRadius: 5};
    let titleStyle = {padding: 15, marginLeft: 160};
    let resetButtonStyle = {marginLeft: 200, marginBottom: 20, height: 25, width: 90, borderRadius: 5};
    let winningFontStyle = {padding: 15, marginLeft: 185, fontSize: 16, color: styleColor};

    return (
      <div style={canvasStyle}>
        <h2 style={titleStyle}>Connect Four</h2>

        <Table table={this.state.table} onCircleClickHandler={this.onCircleClickHandler} />

        {
          !this.state.hasWon.someone ? null :
            <>
              <p style={winningFontStyle}>{color} has won!</p>
              <button style={resetButtonStyle} onClick={this.restartGame}>Restart Game</button>
            </>
        }

        {
          !this.state.isTied ? null : 
            <>
              <p style={Object.assign(winningFontStyle, { color: 'black', marginLeft: 195 })}>Tie game!</p>
              <button style={resetButtonStyle} onClick={this.restartGame}>Restart Game</button>
            </>
        }
      </div>
    );
  }
}

export default App;