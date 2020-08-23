import CellObject from "./CellObject";
import GameBoardObject from "./GameBoardObject";

export default class GameCreator {
  createGame(rows, columns, mines) {
    const gameBoard = createBlankGameBoard(rows, columns);
    populateMines(gameBoard, mines);
    populateSurroundingMines(gameBoard);
    return gameBoard;
  }
}

function createBlankGameBoard(rows, columns) {
  let rowMap = new Map();

  for (let i = 0; i < rows; i++) {
    let row = createRow(i, columns);
    rowMap.set(i, row);
  }

  return new GameBoardObject(rowMap);
}

function createRow(row, numOfColumns) {
  let columnMap = new Map();
  for (let i = 0; i < numOfColumns; i++) {
    columnMap.set(i, new CellObject(row, i));
  }
  return columnMap;
}

function populateMines(gameBoard, mines) {
  const maxRowNumber = gameBoard.getRowCount();
  const maxColumnNumber = gameBoard.getColumnCount();
  for (let i = 0; i < mines; i++) {
    let minePlaced = false;

    while (!minePlaced) {
      const row = generateRandomNumber(maxRowNumber);
      const column = generateRandomNumber(maxColumnNumber);
      const cell = gameBoard.getCell(row, column);
      if (!cell.getIsMine()) {
        cell.setIsMine(true);
        minePlaced = true;
      }
    }
  }
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function populateSurroundingMines(gameBoard) {
  const rows = gameBoard.getRowCount();
  const columns = gameBoard.getColumnCount();

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const cell = gameBoard.getCell(row, column);
      const surroundingCells = gameBoard.getSurroundingCells(row, column);
      const surroundingMines = countMines(surroundingCells);
      cell.setSurroundingMines(surroundingMines);
    }
  }
}

function countMines(cells) {
  let mines = 0;
  cells.forEach(cell => {
    if (cell.getIsMine()) {
      mines += 1;
    }
  });
  return mines;
}
