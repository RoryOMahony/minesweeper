import { getSurroundingCells } from "./GameBoardObject";
import { BOARD_REDUCER_ACTIONS } from "../reducers/BoardReducer";

export default class SurroundingCellUpdater {
  handleCellSelected(cell, gameBoard, gameBoardDispatch) {
    const surroundingMines = cell.surroundingMines;
    if (!cell.isMine && surroundingMines === 0) {
      const cellsSelected = this.processCellWithNoSurroundingMines(
        cell,
        gameBoard,
        gameBoardDispatch,
        []
      );
      this.setCellsToBeSelected(cellsSelected, gameBoardDispatch);
    }
  }

  processCellWithNoSurroundingMines(
    cell,
    gameBoard,
    gameBoardDispatch,
    updatedCells
  ) {
    const surroundingCells = getSurroundingCells(
      gameBoard,
      cell.row,
      cell.column
    );

    surroundingCells.forEach(cell => {
      if (this.shouldCheckCell(updatedCells, cell)) {
        updatedCells.push(cell);
        if (!cell.isMine && cell.surroundingMines === 0) {
          this.processCellWithNoSurroundingMines(
            cell,
            gameBoard,
            gameBoardDispatch,
            updatedCells
          );
        }
      }
    });
    return updatedCells;
  }

  shouldCheckCell(updatedCells, cellToCheck) {
    return (
      updatedCells.filter(
        cell =>
          cell.row === cellToCheck.row && cell.column === cellToCheck.column
      ).length === 0
    );
  }

  setCellsToBeSelected(cells, gameBoardDispatch) {
    gameBoardDispatch({
      type: BOARD_REDUCER_ACTIONS.CELLS_SELECTED,
      payload: cells
    });
  }
}
