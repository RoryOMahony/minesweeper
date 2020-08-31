import CellObject from "./CellObject";
import GameObject, {
  getRowCount,
  getColumnCount,
  getCell,
  getSurroundingCells
} from "./GameObject";

export function createGameFromDifficulty(gameDifficulty) {
  const { rows, columns, mines } = gameDifficulty;
  return createGame(rows, columns, mines);
}

export function createGame(rows, columns, mines) {
  const game = createNewGame(rows, columns);
  game.numOfMines = mines;
  game.flagsAvailable = mines;
  return game;
}

function createNewGame(rows, columns) {
  let rowMap = [];

  for (let i = 0; i < rows; i++) {
    let row = createRow(i, columns);
    rowMap.push(row);
  }

  return new GameObject(rowMap);
}

function createRow(row, numOfColumns) {
  let columnMap = [];
  for (let i = 0; i < numOfColumns; i++) {
    columnMap.push(new CellObject(row, i));
  }
  return columnMap;
}

export function calculateMinesToPlace(board, numOfMinesToPlace, offLimitCell) {
  const maxRowNumber = getRowCount(board);
  const maxColumnNumber = getColumnCount(board);

  const mines = [];

  for (let i = 0; i < numOfMinesToPlace; i++) {
    let minePlaced = false;
    while (!minePlaced) {
      const row = generateRandomNumber(maxRowNumber);
      const column = generateRandomNumber(maxColumnNumber);
      if (row === offLimitCell.row && column === offLimitCell.column) {
        continue;
      }
      const cell = getCell(board, row, column);
      if (!containsCell(mines, cell)) {
        cell.isMine = true;
        mines.push(cell);
        minePlaced = true;
      }
    }
  }
  return mines;
}

function containsCell(cells, cellToCheck) {
  return cells.some(
    cell => cell.row === cellToCheck.row && cell.column === cellToCheck.column
  );
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

export function populateSurroundingMines(board) {
  const rows = getRowCount(board);
  const columns = getColumnCount(board);

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const cell = getCell(board, row, column);
      const surroundingCells = getSurroundingCells(board, row, column);
      cell.surroundingMines = countMines(surroundingCells);
    }
  }
}

function countMines(cells) {
  return cells.filter(cell => cell.isMine).length;
}
