import {
  getCell,
  setCell,
  getSurroundingCells,
  setGameState,
  increaseFlagsAvailable,
  decreaseFlagsAvailable,
  setScore
} from "../objects/GameObject";
import { GAME_STATE } from "../objects/GameState";
import GameCreator from "../objects/GameCreator";

export const BOARD_REDUCER_ACTIONS = {
  UNCOVER_CELL: "UNCOVER_CELL",
  UNCOVER_SURROUNDING_CELLS: "UNCOVER_SURROUNDING_CELLS",
  TOGGLE_FLAGGED: "TOGGLE_FLAGGED",
  INCREASE_SCORE: "INCREASE_SCORE"
};

export const GameReducer = (state, dispatch) => {
  const updatedState = { ...state };

  switch (dispatch.type) {
    case BOARD_REDUCER_ACTIONS.UNCOVER_CELL:
      if (isGameOver(updatedState)) {
        return updatedState;
      }

      if (updatedState.gameState === GAME_STATE.NOT_STARTED) {
        populateMinesOnBoard(updatedState, dispatch.payload);
        setGameState(updatedState, GAME_STATE.IN_PROGRESS);
      }

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
      if (isGameOver(updatedState)) {
        return updatedState;
      }

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
      if (isGameOver(updatedState)) {
        return updatedState;
      }

      if (dispatch.payload.isFlagged) {
        increaseFlagsAvailable(updatedState);
      } else {
        decreaseFlagsAvailable(updatedState);
      }

      toggleFlagged(dispatch.payload, updatedState);
      return updatedState;

    case BOARD_REDUCER_ACTIONS.INCREASE_SCORE:
      setScore(updatedState, updatedState.score + 1);
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

function isGameOver(gameBoard) {
  return (
    gameBoard.gameState === GAME_STATE.LOST ||
    gameBoard.gameState === GAME_STATE.WON
  );
}

function populateMinesOnBoard(gameBoard, offLimitCell) {
  new GameCreator().initialiseGame(
    gameBoard,
    gameBoard.numOfMines,
    offLimitCell
  );
}
