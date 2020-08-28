import { GAME_STATE } from "./GameState";

export default class GameObject {
  gameState = GAME_STATE.NOT_STARTED;
  numOfMines = 0;
  flagsAvailable = 0;
  score = 0;

  constructor(board) {
    this.board = board;
  }
}

export function setGameState(gameBoard, gameState) {
  gameBoard.gameState = gameState;
}

export function setScore(gameBoard, score){
  gameBoard.score = score;
}

export function decreaseFlagsAvailable(gameBoard){
  gameBoard.flagsAvailable -= 1;
}

export function increaseFlagsAvailable(gameBoard){
  gameBoard.flagsAvailable += 1;
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
