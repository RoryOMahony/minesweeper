import React, { useReducer, useEffect } from "react";
import GameBoard from "./gameboard/GameBoard";
import { createGameFromDifficulty } from "../objects/GameCreator";
import "./Minesweeper.css";
import "./Flex.css";
import { GameReducer, BOARD_REDUCER_ACTIONS } from "../reducers/GameReducer";
import GameInfo from "./gameinfo/GameInfo";
import { GAME_STATE } from "../objects/GameState";
import { DifficultyContainer } from "./difficulty/DifficultyContainer";
import { DIFFICULTIES } from "./difficulty/Difficulties";

export const Minesweeper = () => {
  const [game, gameDispatch] = useReducer(
    GameReducer,
    createGameFromDifficulty(DIFFICULTIES.BEGINNER)
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
    <div className="flex-column flex-cross-axis-center">
      <div>
        <DifficultyContainer gameDispatch={gameDispatch}></DifficultyContainer>
      </div>
      <div id="game">
        <GameInfo game={game} gameDispatch={gameDispatch}></GameInfo>
        <GameBoard
          gameState={game.gameState}
          gameBoard={game.board}
          numOfMines={game.numOfMines}
          gameBoardDispatch={gameDispatch}
        ></GameBoard>
      </div>
    </div>
  );
};
