import { getCell, setCell } from "../objects/GameBoardObject";

export const BOARD_REDUCER_ACTIONS = {
  CELL_SELECTED: "Cell_Selected",
  CELLS_SELECTED: "Cells_Selected"
};

export const BoardReducer = (state, dispatch) => {
  const updatedState = { ...state };

  switch (dispatch.type) {
    case BOARD_REDUCER_ACTIONS.CELL_SELECTED:
      const { row, column } = dispatch.payload;
      const currentCell = getCell(state, row, column);
      const updatedCell = { ...currentCell, selected: true };
      setCell(updatedState, row, column, updatedCell);
      return updatedState;
    case BOARD_REDUCER_ACTIONS.CELLS_SELECTED:
      const cellsToSelect = dispatch.payload;
      cellsToSelect.forEach(cell => {
        const currentCell = getCell(state, cell.row, cell.column);
        const updatedCell = { ...currentCell, selected: true };
        setCell(updatedState, cell.row, cell.column, updatedCell);
      });
      return updatedState;
    default:
      return state;
  }
};
