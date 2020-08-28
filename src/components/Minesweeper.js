import React, { useReducer, useEffect } from "react";
import GameBoard from "./gameboard/GameBoard";
import GameCreator from "../objects/GameCreator";
import "./Minesweeper.css";
import { GameReducer, BOARD_REDUCER_ACTIONS } from "../reducers/GameReducer";
import GameInfo from "./gameinfo/GameInfo";
import { GAME_STATE } from "../objects/GameState";

export const Minesweeper = () => {
  const [game, gameDispatch] = useReducer(
    GameReducer,
    new GameCreator().createGame(10, 10, 10)
  );

  useEffect(() => {
    let intervalId;
    if (game.gameState === GAME_STATE.IN_PROGRESS) {
      intervalId = setInterval(() => {
        gameDispatch({
          type: BOARD_REDUCER_ACTIONS.INCREASE_SCORE
        });
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [game.gameState]);

  return (
    <div id="game">
      <GameInfo game={game}></GameInfo>
      <GameBoard gameBoard={game} gameBoardDispatch={gameDispatch}></GameBoard>
    </div>
  );
};
