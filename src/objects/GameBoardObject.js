import { GAME_STATE } from "./GameState";

export default class GameBoardObject {
  gameState = GAME_STATE.IN_PROGRESS;

  constructor(board) {
    this.board = board;
  }
}

export function setGameState(gameBoard, gameState) {
  gameBoard.gameState = gameState;
}

export function getRowCount(gameBoard) {
  return gameBoard.board.length;
}

export function getColumnCount(gameBoard) {
  const rowCount = getRowCount(gameBoard);
  if (rowCount === 0) {
    return 0;
  }
  return gameBoard.board[0].length;
}

export function getCell(gameBoard, rowNum, colNum) {
  const row = gameBoard.board[rowNum];
  if (row === undefined) {
    return undefined;
  }
  return row[colNum];
}

export function setCell(gameBoard, rowNum, colNum, cell) {
  const row = gameBoard.board[rowNum];
  if (row === undefined) {
    return;
  }
  row[colNum] = cell;
}

export function getSurroundingCells(gameBoard, cellRowNum, cellColumnNum) {
  let rowToCheck = cellRowNum - 1;
  let columnToCheck = cellColumnNum - 1;

  const surroundingCells = [];

  for (let i = rowToCheck; i < rowToCheck + 3; i++) {
    for (let j = columnToCheck; j < columnToCheck + 3; j++) {
      addSurroundingCell(
        cellRowNum,
        cellColumnNum,
        i,
        j,
        surroundingCells,
        gameBoard
      );
    }
  }

  return surroundingCells;
}

function addSurroundingCell(
  cellRowNum,
  cellColumnNum,
  rowToCheck,
  columnToCheck,
  surroundingCells,
  gameBoard
) {
  if (cellRowNum !== rowToCheck || cellColumnNum !== columnToCheck) {
    const cell = getCell(gameBoard, rowToCheck, columnToCheck);
    if (cell !== undefined) {
      surroundingCells.push(cell);
    }
  }
}
