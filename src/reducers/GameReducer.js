import {
  getCell,
  setCell,
  getSurroundingCells,
  setGameState,
  increaseFlagsAvailable,
  decreaseFlagsAvailable,
  setScore,
  getRowCount,
  getColumnCount
} from "../objects/GameObject";
import { GAME_STATE } from "../objects/GameState";
import GameCreator from "../objects/GameCreator";

export const BOARD_REDUCER_ACTIONS = {
  UNCOVER_CELL: "UNCOVER_CELL",
  UNCOVER_SURROUNDING_CELLS: "UNCOVER_SURROUNDING_CELLS",
  TOGGLE_FLAGGED: "TOGGLE_FLAGGED",
  INCREASE_SCORE: "INCREASE_SCORE",
  RESET_GAME: "RESET_GAME",
  CHANGE_DIFFICULTY: "CHANGE_DIFFICULTY"
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
        updatedCell.selected = true;
        setGameState(updatedState, GAME_STATE.LOST);
      } else if (updatedCell.surroundingMines === 0) {
        const uncoveredCells = recursivelyUncoverAllSurroundingCells(
          updatedCell,
          updatedState
        );
        uncoveredCells.forEach(cell => setCellUncovered(cell, updatedState));
        setGameState(updatedState, calculateGameState(updatedState));
      }

      if (updatedState.gameState === GAME_STATE.LOST) {
        uncoverAllMines(updatedState);
      }

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
        uncoveredCells
          .filter(cell => cell.isMine)
          .forEach(cell => (cell.selected = true));

        setGameState(updatedState, calculateGameState(updatedState));
      }

      if (updatedState.gameState === GAME_STATE.LOST) {
        uncoverAllMines(updatedState);
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

    case BOARD_REDUCER_ACTIONS.RESET_GAME:
      let rows = getRowCount(updatedState);
      let columns = getColumnCount(updatedState);
      console.log(rows, columns, updatedState);
      return new GameCreator().createGame(
        rows,
        columns,
        updatedState.numOfMines
      );

    case BOARD_REDUCER_ACTIONS.CHANGE_DIFFICULTY:
      const gameDifficultyInfo = dispatch.payload;
      return new GameCreator().createGame(
        gameDifficultyInfo.rows,
        gameDifficultyInfo.columns,
        gameDifficultyInfo.mines
      );

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
  const updatedCell = { ...currentCell, display: true };
  setCell(gameBoard, row, column, updatedCell);
  return updatedCell;
}

function calculateGameState(gameBoard) {
  let uncoveredAllNoneMines = true;

  for (let row of gameBoard.board) {
    const mineSelectedInRow = row
      .filter(cell => cell.isMine)
      .some(cell => cell.display);

    if (mineSelectedInRow) {
      return GAME_STATE.LOST;
    }

    const selectedAllNonMinesInRow = row
      .filter(cell => !cell.isMine)
      .every(cell => cell.display);
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
    cell => !cell.isFlagged && !cell.display
  );

  surroundingCellsToUncover.forEach(cell => {
    cell.display = true;
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

function uncoverAllMines(game) {
  for (let row of game.board) {
    row.filter(cell => cell.isMine).forEach(cell => (cell.display = true));
  }
}
