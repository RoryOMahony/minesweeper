import React, { useReducer } from "react";
import Cell from "./Cell";
import GameCreator from "../../objects/GameCreator";
import "../Flex.css";
import {
  BoardReducer,
  BOARD_REDUCER_ACTIONS
} from "../../reducers/BoardReducer";
import { GAME_STATE } from "../../objects/GameState";

const GameBoard = ({ rows, columns, mines }) => {
  const [gameBoard, gameBoardDispatch] = useReducer(
    BoardReducer,
    new GameCreator().createGame(rows, columns, mines)
  );

  function handleCellSelected(cell) {
    if (gameBoard.gameState !== GAME_STATE.IN_PROGRESS) {
      return;
    }

    gameBoardDispatch({
      type: BOARD_REDUCER_ACTIONS.UNCOVER_CELL,
      payload: cell
    });
  }

  function handleCellDoubleClick(cell) {
    if (gameBoard.gameState !== GAME_STATE.IN_PROGRESS) {
      return;
    }

    gameBoardDispatch({
      type: BOARD_REDUCER_ACTIONS.UNCOVER_SURROUNDING_CELLS,
      payload: cell
    });
  }

  function handleCellRightClick(cell) {
    if (gameBoard.gameState !== GAME_STATE.IN_PROGRESS) {
      return;
    }

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
