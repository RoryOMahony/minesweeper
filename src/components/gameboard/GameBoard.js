import React, { useCallback } from "react";
import Cell from "./Cell";
import "../Flex.css";
import { BOARD_REDUCER_ACTIONS } from "../../reducers/GameReducer";
import { GAME_STATE } from "../../objects/GameState";
import { calculateMinesToPlace } from "../../objects/GameCreator";

const GameBoard = ({ gameState, gameBoard, numOfMines, gameBoardDispatch }) => {
  const handleCellSelected = useCallback(
    cell => {
      if (gameState === GAME_STATE.NOT_STARTED) {
        const minesToPlace = calculateMinesToPlace(gameBoard, numOfMines, cell);

        gameBoardDispatch({
          type: BOARD_REDUCER_ACTIONS.INITIALISE_GAME,
          payload: minesToPlace
        });
      }

      gameBoardDispatch({
        type: BOARD_REDUCER_ACTIONS.DISPLAY_CELL,
        payload: cell
      });
    },
    [gameBoardDispatch, gameState, gameBoard, numOfMines]
  );

  const handleCellDoubleClick = useCallback(
    cell => {
      gameBoardDispatch({
        type: BOARD_REDUCER_ACTIONS.DISPLAY_SURROUNDING_CELLS,
        payload: cell
      });
    },
    [gameBoardDispatch]
  );

  const handleCellRightClick = useCallback(
    cell => {
      gameBoardDispatch({
        type: BOARD_REDUCER_ACTIONS.TOGGLE_FLAGGED,
        payload: cell
      });
    },
    [gameBoardDispatch]
  );

  const gameOver =
    gameState === GAME_STATE.LOST || gameState === GAME_STATE.WON;

  return (
    <div>
      {gameBoard.map((row, index) => {
        const column = row.map(cell => {
          return (
            <Cell
              cell={cell}
              gameOver={gameOver}
              cellSelectedCallBack={handleCellSelected}
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
