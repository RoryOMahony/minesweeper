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
import {
  populateSurroundingMines,
  createGameFromDifficulty,
  createGame
} from "../objects/GameCreator";

export const BOARD_REDUCER_ACTIONS = {
  INITIALISE_GAME: "INITIALISE_GAME",
  DISPLAY_CELL: "DISPLAY_CELL",
  DISPLAY_SURROUNDING_CELLS: "DISPLAY_SURROUNDING_CELLS",
  TOGGLE_FLAGGED: "TOGGLE_FLAGGED",
  INCREASE_SCORE: "INCREASE_SCORE",
  RESET_GAME: "RESET_GAME",
  CHANGE_DIFFICULTY: "CHANGE_DIFFICULTY"
};

export const GameReducer = (state, dispatch) => {
  const updatedState = { ...state };

  switch (dispatch.type) {
    case BOARD_REDUCER_ACTIONS.INITIALISE_GAME:
      for (let mineToPlace of dispatch.payload) {
        setCellAsMine(mineToPlace, updatedState.board);
      }
      populateSurroundingMines(updatedState.board);
      setGameState(updatedState, GAME_STATE.IN_PROGRESS);
      return updatedState;

    case BOARD_REDUCER_ACTIONS.DISPLAY_CELL:
      if (isGameOver(updatedState)) {
        return updatedState;
      }

      const updatedCell = displayCell(dispatch.payload, updatedState.board);
      updatedCell.selected = true;

      if (updatedCell.isMine) {
        setGameState(updatedState, GAME_STATE.LOST);
        displayAllMines(updatedState);
      } else {
        if (updatedCell.surroundingMines === 0) {
          const uncoveredCells = displayAllValidCells(
            updatedCell,
            updatedState.board
          );
          uncoveredCells.forEach(cell => displayCell(cell, updatedState.board));
        }
        setGameState(updatedState, calculateGameState(updatedState));
      }

      return updatedState;

    case BOARD_REDUCER_ACTIONS.DISPLAY_SURROUNDING_CELLS:
      if (isGameOver(updatedState)) {
        return updatedState;
      }

      const { row, column } = dispatch.payload;
      const surroundingCells = getSurroundingCells(
        updatedState.board,
        row,
        column
      );
      const flaggedSurroundingCells = surroundingCells.filter(
        cell => cell.isFlagged
      );

      if (
        flaggedSurroundingCells.length === dispatch.payload.surroundingMines
      ) {
        const uncoveredCells = displayAllValidCells(
          dispatch.payload,
          updatedState.board
        );
        uncoveredCells.forEach(cell => displayCell(cell, updatedState.board));
        uncoveredCells
          .filter(cell => cell.isMine)
          .forEach(cell => (cell.selected = true));

        setGameState(updatedState, calculateGameState(updatedState));
      }

      if (updatedState.gameState === GAME_STATE.LOST) {
        displayAllMines(updatedState);
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

      toggleFlagged(dispatch.payload, updatedState.board);
      return updatedState;

    case BOARD_REDUCER_ACTIONS.INCREASE_SCORE:
      setScore(updatedState, updatedState.score + 1);
      return updatedState;

    case BOARD_REDUCER_ACTIONS.RESET_GAME:
      let rows = getRowCount(updatedState.board);
      let columns = getColumnCount(updatedState.board);
      return createGame(rows, columns, updatedState.numOfMines);

    case BOARD_REDUCER_ACTIONS.CHANGE_DIFFICULTY:
      return createGameFromDifficulty(dispatch.payload);

    default:
      return state;
  }
};

function toggleFlagged(cell, board) {
  const { row, column } = cell;
  const updatedCell = { ...cell, isFlagged: !cell.isFlagged };
  setCell(board, row, column, updatedCell);
}

function displayCell(cell, board) {
  const currentCell = getCell(board, cell.row, cell.column);
  const updatedCell = { ...currentCell, display: true };
  setCell(board, updatedCell.row, updatedCell.column, updatedCell);
  return updatedCell;
}

function setCellAsMine(cell, board) {
  const currentCell = getCell(board, cell.row, cell.column);
  const updatedCell = { ...currentCell, isMine: true };
  setCell(board, updatedCell.row, updatedCell.column, updatedCell);
  return updatedCell;
}

function isGameOver(gameBoard) {
  return (
    gameBoard.gameState === GAME_STATE.LOST ||
    gameBoard.gameState === GAME_STATE.WON
  );
}

function displayAllMines(game) {
  for (let row of game.board) {
    row.filter(cell => cell.isMine).forEach(cell => (cell.display = true));
  }
}

function calculateGameState(gameBoard) {
  let allNonMineCellsDisplayed = true;

  for (let row of gameBoard.board) {
    const mineInRowDisplayed = row
      .filter(cell => cell.isMine)
      .some(cell => cell.display);

    if (mineInRowDisplayed) {
      return GAME_STATE.LOST;
    }

    const allNonMineCellsInRowDisplayed = row
      .filter(cell => !cell.isMine)
      .every(cell => cell.display);
    if (!allNonMineCellsInRowDisplayed) {
      allNonMineCellsDisplayed = false;
    }
  }

  return allNonMineCellsDisplayed ? GAME_STATE.WON : GAME_STATE.IN_PROGRESS;
}

function displayAllValidCells(cell, gameBoard) {
  const processedCells = [];
  const cellsToProcess = [cell];

  while (cellsToProcess.length !== 0) {
    const cellToProcess = cellsToProcess.pop();

    if (
      processedCells[cellToProcess.row] &&
      processedCells[cellToProcess.row][cellToProcess.column]
    ) {
      continue;
    }

    const surroundingCells = getSurroundingCells(
      gameBoard,
      cellToProcess.row,
      cellToProcess.column
    );
    const surroundingCellsToUncover = surroundingCells.filter(
      cellToUncover => !cellToUncover.isFlagged && !cellToUncover.display
    );
    surroundingCellsToUncover.forEach(cellToUncover => {
      cellToUncover.display = true;
      if (cellToUncover.surroundingMines === 0) {
        cellsToProcess.push(cellToUncover);
      }
    });

    if (processedCells[cellToProcess.row] === undefined) {
      processedCells[cellToProcess.row] = [];
    }
    processedCells[cellToProcess.row][cellToProcess.column] = cellToProcess;
  }

  return processedCells.reduce(
    (acc, curr) => (curr ? acc.concat(...curr.filter(col => col)) : curr),
    []
  );
}
