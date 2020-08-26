import CellObject from "./CellObject";
import GameBoardObject, {
  getRowCount,
  getColumnCount,
  getCell,
  getSurroundingCells
} from "./GameBoardObject";

export default class GameCreator {
  createGame(rows, columns, mines) {
    const gameBoard = createBlankGameBoard(rows, columns);
    populateMines(gameBoard, mines);
    populateSurroundingMines(gameBoard);
    return gameBoard;
  }
}

function createBlankGameBoard(rows, columns) {
  let rowMap = [];

  for (let i = 0; i < rows; i++) {
    let row = createRow(i, columns);
    rowMap.push(row);
  }

  return new GameBoardObject(rowMap);
}

function createRow(row, numOfColumns) {
  let columnMap = [];
  for (let i = 0; i < numOfColumns; i++) {
    columnMap.push(new CellObject(row, i));
  }
  return columnMap;
}

function populateMines(gameBoard, mines) {
  const maxRowNumber = getRowCount(gameBoard);
  const maxColumnNumber = getColumnCount(gameBoard);
  for (let i = 0; i < mines; i++) {
    let minePlaced = false;
    while (!minePlaced) {
      const row = generateRandomNumber(maxRowNumber);
      const column = generateRandomNumber(maxColumnNumber);
      const cell = getCell(gameBoard, row, column);
      if (!cell.isMine) {
        cell.isMine = true;
        minePlaced = true;
      }
    }
  }
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function populateSurroundingMines(gameBoard) {
  const rows = getRowCount(gameBoard);
  const columns = getColumnCount(gameBoard);

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const cell = getCell(gameBoard, row, column);
      const surroundingCells = getSurroundingCells(gameBoard, row, column);
      const surroundingMines = countMines(surroundingCells);
      cell.surroundingMines = surroundingMines;
    }
  }
}

function countMines(cells) {
  let mines = 0;
  cells.forEach(cell => {
    if (cell.isMine) {
      mines += 1;
    }
  });
  return mines;
}
