import React, { useReducer } from "react";
import GameBoard from "./gameboard/GameBoard";
import GameCreator from "../objects/GameCreator";
import "./Minesweeper.css";
import { GameReducer } from "../reducers/GameReducer";
import GameInfo from "./gameinfo/GameInfo";

export const Minesweeper = () => {
  const [gameBoard, gameBoardDispatch] = useReducer(
    GameReducer,
    new GameCreator().createGame(10, 10, 10)
  );

  return (
    <div id="game">
      <GameInfo game={gameBoard}></GameInfo>
      <GameBoard
        gameBoard={gameBoard}
        gameBoardDispatch={gameBoardDispatch}
      ></GameBoard>
    </div>
  );
};
