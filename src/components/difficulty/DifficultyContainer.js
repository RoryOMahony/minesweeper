import React from "react";
import { GameDifficulty } from "./GameDifficulty";
import { DIFFICULTIES } from "./Difficulties";

export const DifficultyContainer = ({ gameDispatch }) => {
  return (
    <div className="flex-row">
      <GameDifficulty
        gameDispatch={gameDispatch}
        difficultyInfo={DIFFICULTIES.BEGINNER}
      ></GameDifficulty>
      <GameDifficulty
        gameDispatch={gameDispatch}
        difficultyInfo={DIFFICULTIES.INTERMEDIATE}
      ></GameDifficulty>
      <GameDifficulty
        gameDispatch={gameDispatch}
        difficultyInfo={DIFFICULTIES.EXPERT}
      ></GameDifficulty>
    </div>
  );
};
