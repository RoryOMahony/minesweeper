import React from "react";
import { GameDifficulty } from "./GameDifficulty";
import { DIFFICULTIES } from "./Difficulties";
import { CustomDifficulty } from "./CustomDifficulty";
import "../Flex.css";
import "./DifficultyContainer.css";

export const DifficultyContainer = ({ gameDispatch }) => {
  return (
    <div className="flex-row flex-main-axis-center">
      <div className="difficulty-container-item">
        <GameDifficulty
          className="difficulty-container-item"
          gameDispatch={gameDispatch}
          difficultyInfo={DIFFICULTIES.BEGINNER}
        ></GameDifficulty>
      </div>
      <div className="difficulty-container-item">
        <GameDifficulty
          className="difficulty-container-item"
          gameDispatch={gameDispatch}
          difficultyInfo={DIFFICULTIES.INTERMEDIATE}
        ></GameDifficulty>
      </div>
      <div className="difficulty-container-item">
        <GameDifficulty
          className="difficulty-container-item"
          gameDispatch={gameDispatch}
          difficultyInfo={DIFFICULTIES.EXPERT}
        ></GameDifficulty>
      </div>
      <div className="difficulty-container-item">
        <CustomDifficulty
          className="difficulty-container-item"
          gameDispatch={gameDispatch}
        ></CustomDifficulty>
      </div>
    </div>
  );
};
