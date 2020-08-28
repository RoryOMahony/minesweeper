import React, { useReducer } from "react";
import GameBoard from "./gameboard/GameBoard";
import GameCreator from "../objects/GameCreator";
import "./Minesweeper.css";
import NumberDisplay from "./gameinfo/NumberDisplay";

import { GameReducer } from "../reducers/GameReducer";

export const Minesweeper = () => {
  const [gameBoard, gameBoardDispatch] = useReducer(
    GameReducer,
    new GameCreator().createGame(10, 10, 10)
  );

  return (
    <div id="game">
      <NumberDisplay number={gameBoard.flagsAvailable}></NumberDisplay>
      <GameBoard
        gameBoard={gameBoard}
        gameBoardDispatch={gameBoardDispatch}
      ></GameBoard>
    </div>
  );
};
