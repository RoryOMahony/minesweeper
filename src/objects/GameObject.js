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

export function setGameState(game, gameState) {
  game.gameState = gameState;
}

export function setScore(game, score){
  game.score = score;
}

export function decreaseFlagsAvailable(game){
  game.flagsAvailable -= 1;
}

export function increaseFlagsAvailable(game){
  game.flagsAvailable += 1;
}

export function getRowCount(board) {
  return board.length;
}

export function getColumnCount(board) {
  const rowCount = getRowCount(board);
  if (rowCount === 0) {
    return 0;
  }
  return board[0].length;
}

export function getCell(board, rowNum, colNum) {
  const row = board[rowNum];
  if (row === undefined) {
    return undefined;
  }
  return row[colNum];
}

export function setCell(board, rowNum, colNum, cell) {
  const row = board[rowNum];
  if (row === undefined) {
    return;
  }
  row[colNum] = cell;
}

export function getSurroundingCells(board, cellRowNum, cellColumnNum) {
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
        board
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
  board
) {
  if (cellRowNum !== rowToCheck || cellColumnNum !== columnToCheck) {
    const cell = getCell(board, rowToCheck, columnToCheck);
    if (cell !== undefined) {
      surroundingCells.push(cell);
    }
  }
}
