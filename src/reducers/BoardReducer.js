import {
  getCell,
  setCell,
  getSurroundingCells
} from "../objects/GameBoardObject";

export const BOARD_REDUCER_ACTIONS = {
  UNCOVER_CELL: "UNCOVER_CELL",
  TOGGLE_FLAGGED: "Toggle_Flagged",
  UNCOVER_SURROUNDING_CELLS: "UNCOVER_SURROUNDING_CELLS"
};

export const BoardReducer = (state, dispatch) => {
  const updatedState = { ...state };

  switch (dispatch.type) {
    case BOARD_REDUCER_ACTIONS.UNCOVER_CELL:
      const updatedCell = setCellUncovered(dispatch.payload, updatedState);

      if (updatedCell.isMine) {
        console.log("LOST");
        return updatedState;
      }

      if (updatedCell.surroundingMines === 0) {
        const uncoveredCells = recursivelyUncoverAllSurroundingCells(
          updatedCell,
          updatedState
        );

        uncoveredCells.forEach(cell => setCellUncovered(cell, updatedState));

        if (uncoveredCells.some(cell => cell.isMine)) {
          console.log("LOST");
          return updatedState;
        }
      }

      if (uncoveredAllNonMines(updatedState)) {
        console.log("WON");
      }

      return updatedState;

    case BOARD_REDUCER_ACTIONS.UNCOVER_SURROUNDING_CELLS:
      const { row, column } = dispatch.payload;
      const surroundingCells = getSurroundingCells(updatedState, row, column);
      const flaggedSurroundingCells = surroundingCells.filter(
        cell => cell.isFlagged
      );

      if (flaggedSurroundingCells.length === dispatch.payload.surroundingMines) {
        // todo refactor this code and the code above so that the game state is updated when any cells have been uncovered.
        const uncoveredCells = recursivelyUncoverAllSurroundingCells(
          dispatch.payload,
          updatedState
        );

        uncoveredCells.forEach(cell => setCellUncovered(cell, updatedState));

        if (uncoveredCells.some(cell => cell.isMine)) {
          console.log("LOST");
          return updatedState;
        }

        if (uncoveredAllNonMines(updatedState)) {
          console.log("WON");
        }
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

function uncoveredAllNonMines(gameBoard) {
  for (let row of gameBoard.board) {
    const selectedAllNonMinesInRow = row
      .filter(cell => !cell.isMine)
      .every(cell => cell.selected);
    if (!selectedAllNonMinesInRow) {
      return false;
    }
  }

  return true;
}
