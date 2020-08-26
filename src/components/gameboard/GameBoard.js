import React, { useRef, useReducer, useEffect, useState } from "react";
import Cell from "./Cell";
import GameCreator from "../../objects/GameCreator";
import "../Flex.css";
import SurroundingCellUpdater from "../../objects/SurroundingCellUpdater";
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
  const surroundingCellUpdaterdRef = useRef(new SurroundingCellUpdater());

  useEffect(() => {

    // Check if player has lost
    for (let row of gameBoard.board) {
      const selectedMine = row
        .filter(cell => cell.isMine)
        .some(cell => cell.selected);
      if (selectedMine) {
        setGameState(GAME_STATE.LOST);
        console.log("LOST");
        return;
      }
    }

    // Check if player has won
    for (let row of gameBoard.board) {
      const selectedAllNonMines = row
        .filter(cell => !cell.isMine)
        .every(cell => cell.selected);
      if (!selectedAllNonMines) {
        return;
      }
    }

    setGameState(GAME_STATE.WON);
    console.log("WON");
  }, [gameBoard]);

  function handleCellSelected(cell) {
    if (gameState !== GAME_STATE.IN_PROGRESS) {
      return;
    }

    gameBoardDispatch({
      type: BOARD_REDUCER_ACTIONS.CELL_SELECTED,
      payload: cell
    });

    surroundingCellUpdaterdRef.current.handleCellSelected(
      cell,
      gameBoard,
      gameBoardDispatch
    );
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
