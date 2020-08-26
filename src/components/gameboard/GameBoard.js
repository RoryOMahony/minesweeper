import React, { useRef, useReducer } from "react";
import Cell from "./Cell";
import GameCreator from "../../objects/GameCreator";
import "../Flex.css";
import NoSurroundingMinesCellUpdater from "../../objects/NoSurroundingMinesCellUpdater";
import {
  BoardReducer,
  BOARD_REDUCER_ACTIONS
} from "../../reducers/BoardReducer";

const GameBoard = ({ rows, columns, mines }) => {
  const [gameBoard, gameBoardDispatch] = useReducer(
    BoardReducer,
    new GameCreator().createGame(rows, columns, mines)
  );
  const noSurroundingMinesCellUpdatedRef = useRef(
    new NoSurroundingMinesCellUpdater()
  );

  function handleCellSelected(cell) {
    console.log(cell);
    gameBoardDispatch({
      type: BOARD_REDUCER_ACTIONS.CELL_SELECTED,
      payload: cell
    });

    noSurroundingMinesCellUpdatedRef.current.handleCellSelected(
      cell,
      gameBoard,
      gameBoardDispatch
    );
  }

  return (
    <div>
      {gameBoard.board.map((row, index) => {
        const column = row.map(cell => {
          return (
            <Cell
              cell={cell}
              cellSelectedCallback={handleCellSelected}
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
