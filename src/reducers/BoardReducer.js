import {
  getCell,
  setCell,
  getSurroundingCells,
  setGameState
} from "../objects/GameBoardObject";
import { GAME_STATE } from "../objects/GameState";

export const BOARD_REDUCER_ACTIONS = {
  UNCOVER_CELL: "UNCOVER_CELL",
  TOGGLE_FLAGGED: "TOGGLE_FLAGGED",
  UNCOVER_SURROUNDING_CELLS: "UNCOVER_SURROUNDING_CELLS"
};

export const BoardReducer = (state, dispatch) => {
  const updatedState = { ...state };

  switch (dispatch.type) {
    case BOARD_REDUCER_ACTIONS.UNCOVER_CELL:
      const updatedCell = setCellUncovered(dispatch.payload, updatedState);

      if (updatedCell.isMine) {
        setGameState(updatedState, GAME_STATE.LOST);
        return updatedState;
      }

      if (updatedCell.surroundingMines === 0) {
        const uncoveredCells = recursivelyUncoverAllSurroundingCells(
          updatedCell,
          updatedState
        );
        uncoveredCells.forEach(cell => setCellUncovered(cell, updatedState));
      }

      setGameState(updatedState, calculateGameState(updatedState));

      return updatedState;

    case BOARD_REDUCER_ACTIONS.UNCOVER_SURROUNDING_CELLS:
      const { row, column } = dispatch.payload;
      const surroundingCells = getSurroundingCells(updatedState, row, column);
      const flaggedSurroundingCells = surroundingCells.filter(
        cell => cell.isFlagged
      );

      if (
        flaggedSurroundingCells.length === dispatch.payload.surroundingMines
      ) {
        const uncoveredCells = recursivelyUncoverAllSurroundingCells(
          dispatch.payload,
          updatedState
        );
        uncoveredCells.forEach(cell => setCellUncovered(cell, updatedState));

        setGameState(updatedState, calculateGameState(updatedState));
      }
      return updatedState;

    case BOARD_REDUCER_ACTIONS.TOGGLE_FLAGGED:
      toggleFlagged(dispatch.payload, updatedState);
      return updatedState;

    default:
      return state;
  }
};

function toggleFlagged(cell, state) {
  const { row, column } = cell;
  const updatedCell = { ...cell, isFlagged: !cell.isFlagged };
  setCell(state, row, column, updatedCell);
}

function setCellUncovered(cell, gameBoard) {
  const { row, column } = cell;
  const currentCell = getCell(gameBoard, row, column);
  const updatedCell = { ...currentCell, selected: true };
  setCell(gameBoard, row, column, updatedCell);
  return updatedCell;
}

function calculateGameState(gameBoard) {
  let uncoveredAllNoneMines = true;

  for (let row of gameBoard.board) {
    const mineSelectedInRow = row
      .filter(cell => cell.isMine)
      .some(cell => cell.selected);

    if (mineSelectedInRow) {
      return GAME_STATE.LOST;
    }

    const selectedAllNonMinesInRow = row
      .filter(cell => !cell.isMine)
      .every(cell => cell.selected);
    if (!selectedAllNonMinesInRow) {
      uncoveredAllNoneMines = false;
    }
  }
  if (uncoveredAllNoneMines) {
    return GAME_STATE.WON;
  }
  return GAME_STATE.IN_PROGRESS;
}

function recursivelyUncoverAllSurroundingCells(
  cell,
  gameBoard,
  allUncoveredCells = []
) {
  const uncoveredCells = uncoverSurroundingCells(cell, gameBoard);

  uncoveredCells.forEach(cell => {
    allUncoveredCells.push(cell);

    if (!cell.isMine && cell.surroundingMines === 0) {
      recursivelyUncoverAllSurroundingCells(cell, gameBoard, allUncoveredCells);
    }
  });

  return allUncoveredCells;
}

function uncoverSurroundingCells(cell, gameBoard) {
  let uncoveredCells = [];

  const surroundingCells = getSurroundingCells(
    gameBoard,
    cell.row,
    cell.column
  );
  const surroundingCellsToUncover = surroundingCells.filter(
    cell => !cell.isFlagged && !cell.selected
  );

  surroundingCellsToUncover.forEach(cell => {
    cell.selected = true;
    uncoveredCells.push(cell);
  });

  return uncoveredCells;
}
