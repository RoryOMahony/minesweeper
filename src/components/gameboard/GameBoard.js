import React from "react";
import Cell from "./Cell";
import "../Flex.css";
import { BOARD_REDUCER_ACTIONS } from "../../reducers/BoardReducer";

const GameBoard = ({ gameBoard, gameBoardDispatch }) => {
  function handleCellSelected(cell) {
    gameBoardDispatch({
      type: BOARD_REDUCER_ACTIONS.UNCOVER_CELL,
      payload: cell
    });
  }

  function handleCellDoubleClick(cell) {
    gameBoardDispatch({
      type: BOARD_REDUCER_ACTIONS.UNCOVER_SURROUNDING_CELLS,
      payload: cell
    });
  }

  function handleCellRightClick(cell) {
    gameBoardDispatch({
      type: BOARD_REDUCER_ACTIONS.TOGGLE_FLAGGED,
      payload: cell
    });
  }

  return (
    <div>
      {gameBoard.board.map((row, index) => {
        const column = row.map(cell => {
          return (
            <Cell
              cell={cell}
              leftClickCallback={handleCellSelected}
              rightClickCallBack={handleCellRightClick}
              doubleClickCallBack={handleCellDoubleClick}
              key={cell.column}
            ></Cell>
          );
        });
        return (
          <div className="flex-row" key={index}>
            {column}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
