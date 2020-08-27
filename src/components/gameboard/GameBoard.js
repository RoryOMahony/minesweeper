import React, { useReducer, useState } from "react";
import Cell from "./Cell";
import GameCreator from "../../objects/GameCreator";
import "../Flex.css";
import {
  BoardReducer,
  BOARD_REDUCER_ACTIONS
} from "../../reducers/BoardReducer";

const GAME_STATE = {
  IN_PROGRESS: "IN_PROGRESS",
  WON: "WON",
  LOST: "LOST"
};

const GameBoard = ({ rows, columns, mines }) => {
  const [gameState, setGameState] = useState(GAME_STATE.IN_PROGRESS);

  const [gameBoard, gameBoardDispatch] = useReducer(
    BoardReducer,
    new GameCreator().createGame(rows, columns, mines)
  );

  function handleCellSelected(cell) {
    if (gameState !== GAME_STATE.IN_PROGRESS) {
      return;
    }

    gameBoardDispatch({
      type: BOARD_REDUCER_ACTIONS.UNCOVER_CELL,
      payload: cell
    });
  }

  function handleCellRightClick(cell) {
    if (gameState !== GAME_STATE.IN_PROGRESS) {
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
